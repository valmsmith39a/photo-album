
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
router.post('/uploadimage/:albumId', upload.array('images'), function(req, res) {
  var albumId = req.params.albumId; 
  Image.uploadImage(req.files, function(err, imagesArray) {
    Image.updateImagesArrayInAlbum(imagesArray, albumId, function(err, album) {
      res.redirect('/albums/editshowdetailspage/' + req.params.albumId + '/' + album.albumName);
      //res.redirect('/albums/editshowdetailspage/' + albumId);
    });
  });
  /*
  var filename = req.files[0].originalname;  
  var ext = filename.match(/\.\w+$/)[0] || '';

  var supportUploadObj = {};
  supportUploadObj.albumId = req.params.albumId;
  supportUploadObj.filename = filename;
  supportUploadObj.imageBuffer = req.files[0].buffer;
  supportUploadObj.ext = filename.match(/\.\w+$/)[0] || '';
  supportUploadObj.key = uuid.v1() + ext;
  supportUploadObj.albumId = req.params.albumId;
  supportUploadObj.albumId = req.params.albumId;

  Image.uploadImageToAWS(supportUploadObj, function(err, album){
    res.redirect('/albums/editshowdetailspage/' + req.params.albumId + '/' + album.albumName);
  });
  */
});

/* GET all images in an album */
router.get('/getalbumimages/:albumId', authMiddleware, function(req, res, next) {
  var albumMongoId = req.params.albumId; 
  Album.findById(albumMongoId, function(err, album){
    var userImagesArray = [];
    if(album) {
      userImagesArray = album.imagesArray;
    }
    res.send(userImagesArray);
  }).populate('imagesArray');
});

/* GET view full image */
router.get('/fullimage/:imageId', authMiddleware, function(req, res, next) {
    Image.findById(req.params.imageId, function(err, image){
      console.log('image url is: ', image.url);
      res.render('viewFullImage', {imageURL:image.url});
    });
});

/* DELETE remove image */
router.delete('/:imageId/:albumId/:imageIndex', function(req, res, next) {  
    Image.findById(req.params.imageId, function(err, image) {
     var albumMongoId = req.params.albumId; 
     Album.findById(albumMongoId, function(err, album){
      var userImagesArray = album.imagesArray;
      album.imagesArray.splice(req.params.imageIndex, 1);
      album.save(function(err, data){
        image.remove(function(err){
          res.status(err ? 400:200).send(err||null);
          console.log('image REMOVED SUCCESSFULLY');
        });
      });
    });  
  });
});

module.exports = router;