'use strict';

var mongoose = require('mongoose');
var moment = require('moment');
// var jwt = require('jwt-simple');
// var JWT_SECRET = process.env.JWT_SECRET;
var Person; 
var personSchema = new mongoose.Schema({
  occupation: { type: String }, 
  company: { type: String }, 
  name: {
    first: { type: String },
    last: { type: String }
  }, 
  gender: { type: String },
  likes: [{ type: String }],
  dislikes: [{ type: String }],
  education: { type: String }, 
  age: { type: Number, min: 1, max: 120 }, 
  birthday: { type: Date },
  createdAt: { type: Date, default: Date.now }
});


personSchema.pre('save', function(next) {
  this.age = moment().diff(moment(this.birthday), 'years');
  console.log(this.age);
  next();
});

Person = mongoose.model('Person', personSchema);

module.exports = Person;
