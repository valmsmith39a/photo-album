var express = require('express');
var router = express.Router();
var Item = require('../models/item');

router.get('/requesterchoice/:requesteeItemId', function(req, res){
    var requesteeItemId = req.params.requesteeItemId;
    res.render('requesterChoicePage');
})

router.put('/accept', function(req, res){
  var transactionId = req.body.transactionId;
  Transaction.update({_id: transactionId}, {status: 'closed', result: 'accepted' }, function(err, data){
    res.send()
  })
})

router.put('/decline', function(req, res){
  var transactionId = req.body.transactionId;
  Transaction.update({_id: transactionId}, {status: 'closed', result: 'declined' })
  res.send()
})

/* GET all items in shopping cart */
router.get('/', function(req, res, next) {
  // Read from MongoDB
  Item.find({}, function(err, items){
  // Send retrieved items back to main.js
  res.send(items);
  });
});

/* POST request trade */
router.post('/createtraderequest', function(req, res, next) {
  // Create new item
  var transaction = new Transaction(req.body);
  // req.body needs ids for requester, requesterItemId, requestee and requesteeItemId
  Item.update({_id: transaction.requesteeItemId}, {available: false}, function(err, requesteeItem){
      Item.update({_id: transaction.requesterItemId}, {available: false}, function(err, requesterItem){
            console.log('requesterItem', requesterItem, 'requesteeItem', requesteeItem)
  transaction.save(function(err, savedTransaction){
    res.send(savedTransaction);
  
  });
});

/* DELETE delete item in shopping cart */
router.delete('/:itemId', function(req, res, next) {
  // Obtain the id of the object to delete
  // Get the object to delete, and delete item from MongoDB
  Item.findById(req.params.itemId, function(err, item){
    item.remove(function(err){
      if(!err) console.log('item removed successfully');
      // If err, set status and send status back to main.js
      res.status(err ? 400:200).send(err||null);
    });
  });
});

/* EDIT edit item in shopping cart */
router.put('/:itemId', function(req, res, next) {
  // Get the new info to update item in MongoDB, req.body
  var updatedItemObject = req.body;
  // Retrieve the object using the id of the item, req.params.itemId
  Item.findById(req.params.itemId, function(err, item){
    // Update the object based on new info passed in
    item.name = updatedItemObject.name;
    item.price = updatedItemObject.price;
    item.description = updatedItemObject.description;
    item.quantity = updatedItemObject.quantity;
    // Write item back to MongoDB
    item.save(function(err, savedItem){
      res.status(err ? 400:200).send(err||savedItem);
    });
  });
});

module.exports = router;