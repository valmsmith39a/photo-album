'use strict';

var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var JWT_SECRET = process.env.JWT_SECRET;

var userSchema = new mongoose.Schema({
  firebaseId: {type:String},
  name:{type:String},
  email:{type:String}
});

// instance method
userSchema.methods.generateToken = function() {
  var payload = {
    firebaseId: this.uid,
    _id: this._id
  };
  var token = jwt.encode(payload, JWT_SECRET);

  return token;
};

var User = mongoose.model('User', userSchema);

module.exports = User;
