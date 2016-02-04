'use strict';

var Firebase = require('firebase');
var express = require('express');
var User = require('../models/user');
var Item = require('../models/item');
var authMiddleware = require('../config/auth');
var ref = new Firebase('https://trading-app-c-g.firebaseio.com/');
var router = express.Router();

router.post('/register', function(req, res, next) {
  console.log('inside register', req.body);
  ref.createUser(req.body, function(err, userData) {
    if(err) return res.status(400).send(err);
    var userObj = {};
    userObj.firebaseId = userData.uid;
    userObj.name = req.body.name;
    userObj.email = req.body.email;
    User.create(userObj, function(err){
      console.log(userObj);
      res.send(userObj);
    });
  });
});

router.post('/login', function(req, res, next) {
  ref.authWithPassword(req.body, function(err, authData) {
    console.log('auth data is: ', authData);
    if(err) return res.status(400).send(err);
    User.findOne({firebaseId: authData.uid}, function(err, userObj) {
      var token = userObj.generateToken();
      console.log('token is:', token);
      console.log('userObj is:', userObj);
      res.cookie('mytoken', token).send(userObj);
    });
  });
});

router.post('/resetpass', function(req, res, next) {
  console.log("IN");
  var email = req.body.email
  console.log("EMAIL",email);
  ref.resetPassword({
    email: email
  }, function(error) {
    if (error) {
      switch (error.code) {
        case "INVALID_USER":
          console.log("The specified user account does not exist.");
          break;
        default:
          console.log("Error resetting password:", error);
      }
    } else {
      console.log("Password reset email sent successfully!");
    }
  });
  res.send();
});

//authMiddleware,
router.get('/dashboard', function(req, res){
  console.log('in dashboard');

  Item.find({}, function(err, items){
    console.log('items is: ', items);
    res.render('dashboard', {items});
  });

});

router.get('/logout', function(req, res, next) {
  res.clearCookie('mytoken').redirect('/');
});

router.get('/currentuser',authMiddleware, function(req, res, next){

  var currentUserId = res.user._id;
  console.log('current id', currentUserId);

  User.find({_id:currentUserId}, function(err, currentUserObject){
    req.user._id;
    console.log('current user object, ', currentUserObject);
    res.send(currentUserObject);
  });
});

router.post('/changepass', function(req, res, next) {
  console.log('req.body', req.body);
  var email = req.body.email;
  var oldPassword = req.body.oldPassword;
  var newPassword = req.body.newPassword;
ref.changePassword({
  email: email,
  oldPassword: oldPassword,
  newPassword: newPassword
}, function(error) {
  if (error) {
    switch (error.code) {
      case "INVALID_PASSWORD":
        console.log("The specified user account password is incorrect.");
        break;
      case "INVALID_USER":
        console.log("The specified user account does not exist.");
        break;
      default:
        console.log("Error changing password:", error);
    }
  } else {
    console.log("User password changed successfully!");
  }
});
  res.send();
});

router.get('/changepass', function(req, res, next) {
  res.render('changepass');
});

module.exports = router;
