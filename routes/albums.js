var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Album = require('../models/album');
var authMiddleware = require('../config/auth.js');

/* GET all users' albums */
router.get('/allusersalbums', authMiddleware, function(req, res, next) {
  Album.find({}, function(err, allUsersAlbums){
    res.render('allUsersAlbums', {allUsersAlbums:allUsersAlbums});
  });
});

/* GET specific user's public album in all users album list  */
router.get('/userpublicalbum/:albumId', authMiddleware, function(req, res, next) {
  Album.findById(req.params.albumId).populate('imagesArray').exec(function(err, userPublicAlbum){
    res.render('userPublicAlbum', {userPublicAlbumName:userPublicAlbum.albumName, imagesArray:userPublicAlbum.imagesArray});
  });
});

/* GET album details page */
router.get('/editshowdetailspage/:albumId/:albumName', authMiddleware, function(req, res, next) {
  var albumMongoId = req.params.albumId; 
  var albumName = req.params.albumName;
  res.render('editAndShowDetailsPage', {albumId: albumMongoId, albumName:albumName});
});

/* GET all user albums */
router.get('/getalluseralbums', authMiddleware, function(req, res, next) {
  var userMongoId = req.user._id;
  User.findById(userMongoId, function(err, userObject) {
    var userAlbumsArray = userObject.albumsArray;
    res.send(userAlbumsArray);
  }).populate('albumsArray');
});

/* POST create user album */
router.post('/createalbum', authMiddleware, function(req, res, next) {
  console.log('create album');
  var userMongoId = req.user._id;
  User.findById(userMongoId, function(err, userObject) {  
    var album = new Album(req.body);
    album.save(function(err, savedAlbum) {
      userObject.albumsArray.push(savedAlbum);
      userObject.save(function(err, savedUserObject) {
        res.send(savedUserObject);
      });    
    });
  });
});

/* DELETE remove user album */
router.delete('/:albumId/:albumIndex', authMiddleware,function(req, res, next) {  
  var userId = req.user._id; 
  Album.findById(req.params.albumId, function(err, album) {
    User.findById(userId, function(err, user){
      user.albumsArray.splice(req.params.albumIndex, 1);
      user.save(function(err, data){
        album.remove(function(err){
          res.status(err ? 400:200).send(err||null);
        });
      });
    });  
  });
});

router.put('/:albumId', function(req, res, next) {
  console.log('album id: ', req.body);
  var updatedItemObject = req.body;
  var itemId = req.params.albumId;
  /*
  Album.findById(itemId, function(err, album){
    album.albumName = updatedItemObject.albumName;
    album.description = updatedItemObject.description;
    album.save(function(err, savedItem){
      res.status(err ? 400:200).send(err||savedItem);
    });
  });
  */
});

module.exports = router;

