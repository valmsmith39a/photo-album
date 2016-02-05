
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

var upload = multer({storage: multer.memoryStorage()}); // Keeps in memory. Will get a file buffer
var Image = require('../models/image');
var Album = require('../models/album');

/* Upload image to AWS */
router.post('/uploadimage/:albumId', upload.array('images'), function(req, res){
  var albumId = req.params.albumId;
  var filename = req.files[0].originalname;
  var imageBuffer = req.files[0].buffer;
  // $ : last , + : one or more
  var ext = filename.match(/\.\w+$/)[0] || '';
  var key = uuid.v1() + ext;  // Guarantee a unique name. + ext to account for different types of files 
  var imageToUpload = {
    Bucket:process.env.AWS_BUCKET,
    Key:key, 
    Body:imageBuffer 
  };

  s3.putObject(imageToUpload, function(err, data) {  // uploads to s3
    var url = process.env.AWS_URL + process.env.AWS_BUCKET + '/' + key;
      
    var image = new Image({
          key:key,
          url:url, 
          name:filename,
          //description:description
    });

    image.save(function(err, image) { // save to MongoDb
      if(err) res.send(err); 
      Album.findById(albumId, function(err, album) {
        album.imagesArray.push(image);
        album.save(function(err, data) {
          if(err) res.send(err)
          res.send('image saved in album successfully');
        });
      });
    });
  });
});

/* GET all images in an album */
router.get('/getalbumimages/:albumId', authMiddleware, function(req, res, next) {
  var albumMongoId = req.params.albumId; 
  Album.findById(albumMongoId, function(err, album){
    var userImagesArray = album.imagesArray;
    res.send(userImagesArray);
  }).populate('imagesArray');
});

/* GET view full image */
router.get('/fullimage/:imageURL', authMiddleware, function(req, res, next) {
  console.log('INSIDE IMAGE URL');
  res.render('viewFullImage', {imageURL:req.params.imageURL});
});

module.exports = router;