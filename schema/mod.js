var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var modSchema = mongoose.Schema({
  _id: String,
  name: String,
  fullname: String,
  version: String,
  author: String,
  authorimage: String,
  thumbnail: String,
  spreadimage: String,
  spreadvideo: String,
  website: String,
  subtitle: String,
  description: String,
  features: [String],
  isPublic: Boolean,
  playable: Boolean,
  exclude: [String],
  bundle: String,
  fetch: String,
  user: String
});

module.exports = mongoose.model('mods', modSchema);
