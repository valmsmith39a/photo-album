'use strict';

var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var JWT_SECRET = process.env.JWT_SECRET;

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

  console.log('pay load is: ', payload);

  var token = jwt.encode(payload, JWT_SECRET);

  return token;
};

var User = mongoose.model('User', userSchema);

module.exports = User;
