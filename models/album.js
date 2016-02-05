'use strict';

var mongoose = require('mongoose');

var albumSchema = new mongoose.Schema({
  albumName:{type:String},
  description:{type:String},
  images:[{type: mongoose.Schema.Types.ObjectId, ref: "Image"}]
});

var Album = mongoose.model('Album', albumSchema);

module.exports = Album;
