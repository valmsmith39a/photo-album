'use strict';

var mongoose = require('mongoose');
var moment = require('moment');
var jwt = require('jwt-simple');
var User = require('../models/user.js');

var JWT_SECRET = process.env.JWT_SECRET;

var Transaction; 
var transactionSchema = new mongoose.Schema({
  requester:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
  requestee:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
  requesterItem:{type: mongoose.Schema.Types.ObjectId, ref: "Item"},
  requesteeItem:{type: mongoose.Schema.Types.ObjectId, ref: "Item"},
  createdAt: { type: Date, default: Date.now }
  status: {type: String, default: 'pending'}
  result: {type: String}
});

/*
transactionSchema.pre('save', function(next) {
  this.age = moment().diff(moment(this.birthday), 'years');
  console.log(this.age);
  next();
});
*/

Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;



