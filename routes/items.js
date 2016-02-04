var express = require('express');
var router = express.Router();
var Item = require('../models/item');

var authMiddleware = require('../config/auth.js');

/* GET all users items */
router.get('/allitems', function(req, res, next) {
  Item.find({}, function(err, items){
  // Send retrieved items back to main.js
    res.send(items);
   });
 });

/* GET current user's item */
router.get('/useritems', authMiddleware, function(req, res, next) {
 
  var userMongoId = req.user._id;

  Item.find({ownerObj:userMongoId}, function(err, items){
  // Send retrieved items back to main.js
    res.send(items);
  });

});

/* POST Create item to trade */
router.post('/createitem', authMiddleware, function(req, res, next) {

  var item = new Item(req.body);
  item.ownerObj= req.user._id

  // Write to MongoDB and send back to main.js
  item.save(function(err, savedItem){
    res.send(savedItem);
  });
});

/* DELETE user item */
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

/* EDIT edit user item */
router.put('/edititem/:itemId', function(req, res, next) {
  // Get the new info to update item in MongoDB, req.body
  var updatedItemObject = req.body;

  // Retrieve the object using the id of the item, req.params.itemId
  Item.findById(req.params.itemId, function(err, item){
    // Update the object based on new info passed in
    item.itemName = updatedItemObject.itemName;
    item.ownerObj = updatedItemObject.ownerObj;
    item.description = updatedItemObject.description;
    // Write item back to MongoDB
    item.save(function(err, savedItem){
      console.log('saved')
      res.status(err ? 400:200).send(err||savedItem);
    });
  });
});

module.exports = router;


