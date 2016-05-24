'use strict';

var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var JWT_SECRET = process.env.JWT_SECRET;
var ref = new Firebase('https://photo-album-aws.firebaseio.com/');

var userSchema = new mongoose.Schema({
  firebaseId: {type:String},
  name:{type:String},
  email:{type:String}, 
  albumsArray:[{type: mongoose.Schema.Types.ObjectId, ref: "Album"}]
});

userSchema.methods.generateToken = function() {
  var payload = {
    firebaseId: this.firebaseId,
    _id: this._id
  };

  var token = jwt.encode(payload, JWT_SECRET);

  return token;
};

userSchema.statics.register = function(user, cb) {
  ref.createUser(req.body, function(err, userData) {
    if(err) return res.status(400).send(err);
    var userObj = {};
    userObj.firebaseId = userData.uid;
    userObj.name = req.body.name;
    userObj.email = req.body.email;
    userObj.albumsArray = req.body.albumsArray;

    User.create(userObj, function(err) {
      cb(err, userObj);
    });
  });
};

userSchema.statics.login = function(user, cb) {
  ref.authWithPassword(user, function(err, authData) {
    if(err) return res.status(400).send(err);

    User.findOne({firebaseId: authData.uid}, function(err, user) {
      var token = user.generateToken();
      if(err) cb(err);
      cb(token, user);
      // res.cookie('mytoken', token).send(userObj);
    });
  });
};



var User = mongoose.model('User', userSchema);

module.exports = User;
