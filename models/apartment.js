'use strict';

var mongoose = require('mongoose');
var moment = require('moment');
// var jwt = require('jwt-simple');
// var JWT_SECRET = process.env.JWT_SECRET;

var Apartment; 

var apartmentSchema = new mongoose.Schema({
  rent: Number, 
  // tenant: { type: mongoose.Schema.types.ObjectId, ref: "Person" }
  tenants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Person" }],
  // pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }],
})

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

Apartment = mongoose.model('Apartment', apartmentSchema);

module.exports = Apartment;
