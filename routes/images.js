
'use strict';

require('dotenv').config(); // Loads environment variables 
var express = require('express');
var router = express.Router();
var Album = require('../models/album');
var authMiddleware = require('../config/auth.js');

var AWS = require('aws-sdk');
var s3 = new AWS.S3(); 
var mongoose = require('mongoose');
var uuid = require('node-uuid');
var multer = require('multer');

// Keeps in memory. Will get a file buffer
var upload = multer({storage: multer.memoryStorage()}); 

var Image = require('../models/image');

// Upload image 
router.post('/uploadimage', upload.array('images'), function(req, res){
  var filename = req.files[0].originalname;
  var imageBuffer = req.files[0].buffer;

  // $ : last , + : one or more
  var ext = filename.match(/\.\w+$/)[0] || '';
  var key = uuid.v1() + ext;  // Guarantee a unique name. + ext to account for different types of files 

  var imageToUpload = {
    Bucket:process.env.AWS_BUCKET,
    Key:key, // name of file on s3 from uuid, a guaranteed, unique name 
    Body:imageBuffer // content of file 
  };

  s3.putObject(imageToUpload, function(err, data) {  // uploads to s3
    console.log('err', err);
    console.log('data is', data);

    var url = process.env.AWS_URL + process.env.AWS_BUCKET + '/' + key;
      
    var image = new Image({
          key:key,
          url:url, 
          name:filename,
          //description:description
    });

    image.save(function(err, data){ // save to MongoDb
      if(!err) res.send(data); 
    });
  });
});

/* GET all images in an album */
router.get('/allimagesinalbum', authMiddleware, function(req, res, next) {
  var albumMongoId = req.user._id;
  Album.findById(albumMongoId, function(err, images){
    res.send(images);
   });
});

/* POST create user image */
router.post('/createimage', authMiddleware, function(req, res, next) {

  var image = new Image(req.body);

  image.save(function(err, savedImage){
    res.send(savedImage);
  });
});

module.exports = router;