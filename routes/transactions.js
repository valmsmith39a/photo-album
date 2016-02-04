var express = require('express');
var router = express.Router();
var Item = require('../models/item');
var Transaction = require('../models/transaction');
var authMiddleware = require('../config/auth.js');


/* Items requested of me ACCEPT/DECLINE */
router.get('/itemsacceptdecline', authMiddleware, function(req, res)  {
  console.log('in dashboard');
  var currentUserId = req.user._id;
  console.log('current user: ', currentUserId);
  Transaction.find({requestee:currentUserId}, function(err, transactions){
    res.send(transactions);
  }).populate('requester requestee requesterItem requesteeItem');
});

/* Items I requested */
router.get('/requesteditems', authMiddleware, function(req, res)  {
  console.log('in dashboard');
  var currentUserId = req.user._id; 
  Transaction.find({requester:currentUserId}, function(err, transactions){
    res.send(transactions);
  }).populate('requester requestee requesterItem requesteeItem');
  //res.render('tradingPage');
  /*
  if (!req.user) { res.render('noauth'); return; };
  //// logged in,   req.user
  User.findById(req.user._id, function(err, user) {
    // res.send(user);
    res.render('profile', { useruid: user.uid, user_id: user._id, pokemon: user.pokemon})
  });
  */
});




// --- Display pages for Transactions 

/* View trading page */
router.get('/tradingpage', function(req, res)  {
  console.log('in dashboard');
  res.render('tradingPage');
  /*
  if (!req.user) { res.render('noauth'); return; };
  //// logged in,   req.user
  User.findById(req.user._id, function(err, user) {
    // res.send(user);
    res.render('profile', { useruid: user.uid, user_id: user._id, pokemon: user.pokemon})
  });
  */
});

/* View transactions page */
router.get('/viewtransactionspage', function(req, res)  {
  console.log('in view transactions page');
  res.render('transactionsView');
  /*
  if (!req.user) { res.render('noauth'); return; };
  //// logged in,   req.user
  User.findById(req.user._id, function(err, user) {
    // res.send(user);
    res.render('profile', { useruid: user.uid, user_id: user._id, pokemon: user.pokemon})
  });
  */
});

// --- 

router.get('/requesterchoice/:itemId', function(req, res){
    Item.findById(req.params.itemId, function(err, item){
      res.render('requesterChoicePage', {item: item});
    });
});

router.put('/accept', function(req, res){
  // var transactionId = req.body;
  // console.log('req.body in ACCEPT IS', req.body);
  // console.log('req.body in TYPE ACCEPT IS', typeof req.body);
  // //console.log('ITEM ID ISSSSSSS: ', JSON.parse(req.body).requesterItem);
  // console.log('TRANSACTION ID IN ACCEPT IS: ', transactionId);

  // console.log('req.body.requester item', req.body.requesterItem);

  // var requesterItemId = req.body.requesterItemId;
  // var requsteeItemId = req.body.requesteeItem['_id']; 
  // var requesterUserId = req.body.requester['_id']; 
  // var requesteeUserId = req.body.requestee['_id']; 
  
//   Transaction.update({ _id: transactionId}, {status: 'closed', result: 'accepted' }, function(err, data){
//     console.log('data in accept is: ', data);
//      //var requesteeItemId = data.requesteeItem.
     // Item.update({ _id: requesterItemId}, {available:true , ownerObj:requesteeUserId}, function(err, data){
//       Item.update({ _id: requesteeItemId}, {available:true , ownerObj:requesterUserId}, function(err, data){
//         res.send('Transaction and both items complete');
//       });
//     });
//   });
// }); 
Transaction.update({ _id: req.body.transactionId}, {status: 'closed', result: 'accepted' }, function(err, data){
    console.log('data in accept is: ', data);

     console.log("JJJJJJJ", req.body.requesterItemId)
     Item.update({ _id: req.body.requesterItemId}, {available:true , ownerObj: req.body.requesteeUserId}, function(err, data){
      console.log("requesterItemId", data)
      Item.update({ _id: req.body.requesteeItemId}, {available:true , ownerObj:req.body.requesterUserId}, function(err, data){
        res.send('Transaction and both items complete');
      });
    });
  });
});

router.put('/decline', function(req, res){
  
  Transaction.update({ _id: req.body.transactionId}, {status: 'closed', result: 'declined' }, function(err, data){
    console.log('data in accept is: ', data);

     console.log("JJJJJJJ", req.body.requesterItemId)
     Item.update({ _id: req.body.requesterItemId}, {available:true}, function(err, data){
      console.log("requesterItemId", data)
      Item.update({ _id: req.body.requesteeItemId}, {available:true}, function(err, data){
        res.send('Transaction and both items complete');
      });
    });
  });
  




});

router.post('/createtraderequest', authMiddleware, function(req, res, next) {
  console.log('inside create trade request');
  var transaction = new Transaction(req.body);
  var requesterId = req.user._id;
  transaction.requester = requesterId;  
  // req.body needs ids for requester, requesterItemId, requestee and requesteeItemId
  Item.update({_id: transaction.requesteeItem}, {available: false}, function(err, requesteeItem){
    console.log('error is: ', err);
    console.log('requestee item is: ', requesteeItem);
    Item.update({_id: transaction.requesterItem}, {available: false}, function(err, requesterItem){
      console.log('requester item is: ', requesterItem);
      //console.log('requesterItem', requesterItem, 'requesteeItem', requesteeItem);
      transaction.save(function(err, savedTransaction){
        console.log('err in transaction save is', err); 
        console.log('saved transaction is: ', savedTransaction);
        res.send(savedTransaction);
      });
    });
  });
});

module.exports = router;

/*
 GET all items in shopping cart 
router.get('/', function(req, res, next) {
  // Read from MongoDB
  Item.find({}, function(err, items){
  // Send retrieved items back to main.js
  res.send(items);
  });
});

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
*/

