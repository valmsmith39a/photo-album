'use strict';
require('dotenv').config(); // Loads environment variables 
var Album = require('../models/album');
var AWS = require('aws-sdk');
var s3 = new AWS.S3(); 
var mongoose = require('mongoose');
var uuid = require('node-uuid');
var multer = require('multer');

var upload = multer({storage: multer.memoryStorage()}); // Keeps in memory. Will get a file buffer
var Image = require('../models/image');
var Album = require('../models/album');

var imageSchema = new mongoose.Schema({
  key:{type:String},
  url:{type:String},
  name:{type:String},
  description:{type:String},
});

imageSchema.statics.uploadImageToAWS = function(supportUploadObj, callback){
  var albumId = supportUploadObj.albumId;
  var filename = supportUploadObj.filename;
  var imageBuffer = supportUploadObj.imageBuffer;
  // $ : last , + : one or more
  var ext = supportUploadObj.ext;
  var key = supportUploadObj.key; // Guarantee a unique name. + ext to account for different types of files 
  
  var imageToUpload = {
    Bucket:process.env.AWS_BUCKET,
    Key:key, 
    Body:imageBuffer 
  };

  s3.putObject(imageToUpload, function(err, data) {  // uploads to s3
    var url = process.env.AWS_URL + process.env.AWS_BUCKET + '/' + key;
    console.log('ERR in S3', err);
    console.log('DATA in S3', data);

    var image = new Image({
          key:key,
          url:url, 
          name:filename
          //description:description
    });

    image.save(function(err, image) { // save to MongoDb
      if(err) return callback(err);
      Album.findById(albumId, function(err, album) {
        album.imagesArray.push(image);
        album.save(function(err, savedAlbum) {
          if(err) return callback(err);
          callback(err, savedAlbum);
          console.log('ERR in save mongo', err);
          console.log('DATA in save mongo', savedAlbum);
          //res.redirect('/albums/editshowdetailspage/' + albumId);
        });
      });
    });
  });
};

var Image = mongoose.model('Image', imageSchema);

module.exports = Image;
