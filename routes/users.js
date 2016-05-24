/**************************************************************
Refactoring notes: 
Test register, login, logout
Should have auth middleware for profile route 
****************************************************************/

'use strict';

var Firebase = require('firebase');
var express = require('express');
var User = require('../models/user');
var Album = require('../models/album');
var authMiddleware = require('../config/auth');
var ref = new Firebase('https://photo-album-aws.firebaseio.com/');
var router = express.Router();

router.post('/register', function(req, res, next) {
  User.register(req.body, function(err, user) {
    console.log('err is: ', err);
    if(err) res.send(err);
    res.send(user);
  });
  /*
  ref.createUser(req.body, function(err, userData) {
    if(err) return res.status(400).send(err);
    var userObj = {};
    userObj.firebaseId = userData.uid;
    userObj.name = req.body.name;
    userObj.email = req.body.email;
    userObj.albumsArray = req.body.albumsArray;
    User.create(userObj, function(err){
      res.send(userObj);
    });
  });
  */
});

router.post('/login', function(req, res, next) {
  User.login(req.body, function(err, token, user) {
    console.log('err is: ', err);
    res.cookie('mytoken', token).send(user);
  });
  /*
  ref.authWithPassword(req.body, function(err, authData) {
    if(err) return res.status(400).send(err);
    User.findOne({firebaseId: authData.uid}, function(err, userObj) {
      var token = userObj.generateToken();
      res.cookie('mytoken', token).send(userObj);
    });
  });
  */
});

router.post('/resetpass', function(req, res, next) {
  var email = req.body.email
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

// Note: Should need authMiddleware
router.get('/profilepage', function(req, res){
  res.render('profilePage');
});

router.get('/logout', function(req, res, next) {
  res.clearCookie('mytoken').redirect('/');
});

router.get('/currentuser',authMiddleware, function(req, res, next){
  var currentUserId = res.user._id;

  User.find({_id:currentUserId}, function(err, currentUserObject){
    req.user._id;
    res.send(currentUserObject);
  });
});

router.post('/changepass', function(req, res, next) {
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
