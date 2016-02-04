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
});

// --- Display pages for Transactions 

/* View trading page */
router.get('/tradingpage', function(req, res)  {
  console.log('in dashboard');
  res.render('tradingPage');
});

/* View transactions page */
router.get('/viewtransactionspage', function(req, res)  {
  console.log('in view transactions page');
  res.render('transactionsView');
});

// --- 

router.get('/requesterchoice/:itemId', function(req, res){
    Item.findById(req.params.itemId, function(err, item){
      res.render('requesterChoicePage', {item: item});
    });
});

router.put('/accept', function(req, res){

Transaction.update({ _id: req.body.transactionId}, {status: 'closed', result: 'accepted' }, function(err, data){
     Item.update({ _id: req.body.requesterItemId}, {available:true , ownerObj: req.body.requesteeUserId}, function(err, data){
      Item.update({ _id: req.body.requesteeItemId}, {available:true , ownerObj:req.body.requesterUserId}, function(err, data){
        res.send('Transaction and both items complete');
      });
    });
  });
});

router.put('/decline', function(req, res){

  Transaction.update({ _id: req.body.transactionId}, {status: 'closed', result: 'declined' }, function(err, data){
     Item.update({ _id: req.body.requesterItemId}, {available:true}, function(err, data){
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
      transaction.save(function(err, savedTransaction){
        console.log('err in transaction save is', err); 
        console.log('saved transaction is: ', savedTransaction);
        res.send(savedTransaction);
      });
    });
  });
});

module.exports = router;

