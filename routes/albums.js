var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Album = require('../models/album');
var authMiddleware = require('../config/auth.js');

/* GET album details page*/
router.get('/editshowdetailspage/:albumId', authMiddleware, function(req, res, next) {
  var albumMongoId = req.params.albumId; //req.user._id;
  console.log('album mongo id is:', albumMongoId);
  res.render('editAndShowDetailsPage', {albumId: albumMongoId});
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
  console.log('inside delete album router file');
  var userId = req.user._id; 
  Album.findById(req.params.albumId, function(err, album) {
    User.findById(userId, function(err, user){
      console.log('before remove', user.albumsArray);
      user.albumsArray.splice(req.params.albumIndex, 1);
      console.log('after remove', user.albumsArray);

      user.save(function(err, data){
        album.remove(function(err){
          res.status(err ? 400:200).send(err||null);
          console.log('album REMOVED SUCCESSFULLY');
        });
      });
    });  
  });
});

router.put('/editalbum/:albumId', function(req, res, next) {
  // Get the new info to update album in MongoDB, req.body

  console.log('inside edit album put');

  var updatedItemObject = req.body;

  var itemId = req.params.albumId;

  // Retrieve the object using the id of the album, req.params.itemId
  Album.findById(itemId, function(err, album){
    // Update the object based on new info passed in
    album.itemName = updatedItemObject.name;
    //album.ownerObj = updatedItemObject.ownerObj;
    album.description = updatedItemObject.description;
    // Write album back to MongoDB
    album.save(function(err, savedItem){
      console.log('saved')
      res.status(err ? 400:200).send(err||savedItem);
    });
  });
});

module.exports = router;

// -------
/*

router.get('/editshowdetailspage/:itemId', authMiddleware, function(req, res, next) {
 
  console.log('inside get edits show details page');

  res.render('editAndShowDetailsPage', {itemId:req.params.itemId});

});

router.put('/edititem', function(req, res, next) {
  // Get the new info to update album in MongoDB, req.body

  console.log('inside edit album put');

  var updatedItemObject = req.body;

  var itemId = req.body.itemId;

  // Retrieve the object using the id of the album, req.params.itemId
  Album.findById(itemId, function(err, album){
    // Update the object based on new info passed in
    album.itemName = updatedItemObject.name;
    //album.ownerObj = updatedItemObject.ownerObj;
    album.description = updatedItemObject.description;
    // Write album back to MongoDB
    album.save(function(err, savedItem){
      console.log('saved')
      res.status(err ? 400:200).send(err||savedItem);
    });
  });
  
});
*/


