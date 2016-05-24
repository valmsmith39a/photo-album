var express = require('express');
var router = express.Router();
var Album = require('../models/album');

var authMiddleware = require('../config/auth.js');

/* GET all images in an album */
router.get('/allimagesinalbum', authMiddleware, function(req, res, next) {
  var userMongoId = req.user._id;
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
