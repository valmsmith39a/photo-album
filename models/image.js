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

  console.log('inside uploadImageToAWS');
  console.log('aws bucket', process.env.AWS_BUCKET);

  /*
  supportUploadObj.albumId = req.params.albumId;
  supportUploadObj.filename = filename;
  supportUploadObj.imageBuffer = req.files[0].buffer;
  supportUploadObj.ext = filename.match(/\.\w+$/)[0] || '';
  supportUploadObj.key = uuid.v1() + ext;
  supportUploadObj.albumId = req.params.albumId;
  supportUploadObj.albumId = req.params.albumId;
  */

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
  














  // ----



  //if(!userObj.email || !userObj.password){
    //return callback('Missing required field (email, password)');
  //}
  // user obj will have email and password
  // create user on firebase



  // return callback for error 
  // save callback in the end 

  /*
  ref.createUser(userObj, function(err, userData){
    // err could be email in use. invoke callback w error and stop
    if(err) return callback(err); // if don't want anything to happen after, return the callback

    // Create new user (new document) in Mongo
    var user = new User();
    user.firebaseId = userData.uid;
    user.email = userObj.email;
    
    user.save(function(err, savedUser){
      callback(err, savedUser);
    });
    
    // Can do this instead
    // .save always asynchronous regardless if
    // For a callback function, the function is triggered later.
    // the inside the .save, will pass to the callback err and userData params
    user.save(callback);
  });
  */
};

// --
/*Eventually, this is how we'll be using .register
  User.register({email:'afdas', password:'adsfaf'}, function(err, user)){

*/

var Image = mongoose.model('Image', imageSchema);





























module.exports = Image;
