'use strict';

var Firebase = require('firebase');
var express = require('express');
var router = express.Router();

var authMiddleware = require('../config/auth');

var User = require('../models/user');

var ref = new Firebase('https://20160128.firebaseio.com/');

router.post('/register', function(req, res, next) {
  ref.createUser(req.body, function(err, userData) {
    if(err) return res.status(400).send(err);
    User.create(userData, function(err) {
      res.send();
    });
  });
});

router.post('/login', function(req, res, next) {
  ref.authWithPassword(req.body, function(err, authData) {
    if(err) return res.status(400).send(err);
    User.findOne({uid: authData.uid}, function(err, user) {
      var token = user.generateToken();
      res.cookie('mytoken', token).send();
    });
  });
});

router.get('/profile', authMiddleware, function(req, res) {
  if (!req.user) { res.render('noauth'); return; };
  //// logged in,   req.user
  User.findById(req.user._id, function(err, user) {
    // res.send(user);
    res.render('profile', { useruid: user.uid, user_id: user._id, pokemon: user.pokemon})
  });
});

router.get('/logout', function(req, res, next) {
  res.clearCookie('mytoken').redirect('/');
});


module.exports = router;
