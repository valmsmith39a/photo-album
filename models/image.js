'use strict';

var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
  key:{type:String},
  url:{type:String},
  name:{type:String},
  description:{type:String},
});

var Image = mongoose.model('Image', imageSchema);

module.exports = Image;
