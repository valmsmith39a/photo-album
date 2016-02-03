var express = require('express');
var router = express.Router();
var Item = require('../models/item');

/* GET all users items */
router.get('/allitems', function(req, res, next) {
  Item.find({}, function(err, items){
  // Send retrieved items back to main.js
  console.log('items is: ', items);
    res.send(items);
   });
 });

/* GET current user's item */
router.get('/useritems/:userId', function(req, res, next) {
  // Read from MongoDB
  console.log('req.body is: ', req.params.userId);

  Item.find({ownerObj:req.params.userId}, function(err, items){
  // Send retrieved items back to main.js
  console.log('items is: ', items);
    res.send(items);
  });
});

/* POST Create item to trade */
router.post('/createitem', function(req, res, next) {
  // Create new item
  console.log('req.body', req.body);

  var item = new Item(req.body);

  console.log('item is', item);
  // Write to MongoDB and send back to main.js
  item.save(function(err, savedItem){
    console.log('saved item: ', savedItem);
    console.log('err', err);
    res.send(savedItem);
  });
});

/* DELETE user item */
router.delete('/:itemId', function(req, res, next) {
  // Obtain the id of the object to delete
  // Get the object to delete, and delete item from MongoDB
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

/*
createdAt:{type:Date, default:Date.now},
  itemName: {type:String}, 
  ownerObj:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
  description:{type:String},
  available:{type:Boolean, default:false}
  */



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

/*
var express = require('express');
var router = express.Router();

var authMiddleware = require('../config/auth');

router.use(authMiddleware);

GET home page. 
router.get('/', function(req, res, next) {
  // show my pokemon
});

router.post('/', function(req, res, next) {
  // add pokemon to user
});

module.exports = router;
*/
