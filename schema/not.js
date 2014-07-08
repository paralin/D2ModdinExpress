var mongoose = require('mongoose');

var notSchema = mongoose.Schema({
  title: String,
  message: String,
  type: String
});

module.exports = mongoose.model('notifications', notSchema);
