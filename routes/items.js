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

/*
var express = require('express');
var router = express.Router();
var Item = require('../models/item');

var authMiddleware = require('../config/auth.js');

router.get('/allitems', function(req, res, next) {
  Item.find({}, function(err, items){
  // Send retrieved items back to main.js
    res.send(items);
   });
 });

router.get('/useritems', authMiddleware, function(req, res, next) {
 
  var userMongoId = req.user._id;

  Item.find({ownerObj:userMongoId}, function(err, items){
  // Send retrieved items back to main.js
    res.send(items);
  });

});

router.get('/editshowdetailspage/:itemId', authMiddleware, function(req, res, next) {
 
  console.log('inside get edits show details page');

  res.render('editAndShowDetailsPage', {itemId:req.params.itemId});

});

router.post('/createitem', authMiddleware, function(req, res, next) {

  var item = new Item(req.body);
  item.ownerObj= req.user._id

  // Write to MongoDB and send back to main.js
  item.save(function(err, savedItem){
    res.send(savedItem);
  });
});



router.delete('/:itemId', function(req, res, next) {
  // Obtain the id of the object to delete
  // Get the object to delete, and delete item from MongoDB
  console.log("Inside Delete", req.params.itemId)
  Item.findById(req.params.itemId, function(err, item){
    item.remove(function(err){
      if(!err) console.log('item removed successfully');
      // If err, set status and send status back to main.js
      console.log('item', item);
      res.status(err ? 400:200).send(err||null);
    });
  });
});

router.put('/edititem', function(req, res, next) {
  // Get the new info to update item in MongoDB, req.body

  console.log('inside edit item put');

  var updatedItemObject = req.body;

  var itemId = req.body.itemId;

  // Retrieve the object using the id of the item, req.params.itemId
  Item.findById(itemId, function(err, item){
    // Update the object based on new info passed in
    item.itemName = updatedItemObject.name;
    //item.ownerObj = updatedItemObject.ownerObj;
    item.description = updatedItemObject.description;
    // Write item back to MongoDB
    item.save(function(err, savedItem){
      console.log('saved')
      res.status(err ? 400:200).send(err||savedItem);
    });
  });
  
});



*/