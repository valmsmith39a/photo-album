'use strict';

var mongoose = require('mongoose');
var moment = require('moment');
var jwt = require('jwt-simple');
var JWT_SECRET = process.env.JWT_SECRET;

var Item; 

var itemSchema = new mongoose.Schema({
  createdAt:{type:Date, default:Date.now},
  itemName: {type:String}, 
  ownerObj:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
  description:{type:String},
  available:{type:Boolean, default:true}
});

/*
personSchema.pre('save', function(next) {
  this.age = moment().diff(moment(this.birthday), 'years');
  console.log(this.age);
  next();
});
*/

Item = mongoose.model('Item', itemSchema);

module.exports = Item;
