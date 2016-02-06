'use strict';
require('dotenv').config(); // Loads environment variables 
var Album = require('../models/album');
var AWS = require('aws-sdk');
var s3 = new AWS.S3(); 
var mongoose = require('mongoose');
var uuid = require('node-uuid');
var multer = require('multer');
var async = require('async');

var upload = multer({storage: multer.memoryStorage()}); // Keeps in memory. Will get a file buffer
var Image = require('../models/image');
var Album = require('../models/album');

var imageSchema = new mongoose.Schema({
  key:{type:String},
  url:{type:String},
  name:{type:String},
  description:{type:String},
});

// files is req.files[] from obtaining file 
imageSchema.statics.uploadImage = function(files, doneCallback) {
  async.map(files, uploadImageToAWS, doneCallback);
};

function uploadImageToAWS(file, callback) {
  var filename = file.originalname;  
  var imageBuffer = file.buffer;
  // $ : last , + : one or more
  var ext = filename.match(/\.\w+$/)[0] || '';
  var key = uuid.v1() + ext;// Guarantee a unique name. + ext to account for different types of files 
  
  var imageToUpload = {
    Bucket:process.env.AWS_BUCKET,
    Key:key, 
    Body:imageBuffer 
  };

  /*
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
  */

  s3.putObject(imageToUpload, function(err, data) {  // uploads to s3
    var url = process.env.AWS_URL + process.env.AWS_BUCKET + '/' + key;

    var image = new Image({
          key:key,
          url:url, 
          name:filename
          //description:description
    });

    image.save(function(err, savedImage) { // save to MongoDb
      if(err) return callback(err);
      callback(null, savedImage);
      /*
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
      */
    }); // image.save()
  }); // s3.putObject()
}

imageSchema.statics.updateImagesArrayInAlbum = function (imagesArray, albumId, callback) {
  Album.findById(albumId, function(err, album) {
        album.imagesArray = album.imagesArray.concat(imagesArray);
        album.save(function(err, savedAlbum) {
          if(err) return callback(err);
          callback(err, savedAlbum);
        });
  }); // Album.findById
}

var Image = mongoose.model('Image', imageSchema);

module.exports = Image;
