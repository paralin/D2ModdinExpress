var mongoose = require('mongoose');

var queueSchema = mongoose.Schema({
  //ID is the initial position in the queue
  _id: Number,
  steam_id: String,
  invited: Boolean,
  //If used key this will be the key
  invite_key: String,
  date_invited: Date
});

module.exports = mongoose.model('inviteQueue', queueSchema, 'inviteQueue');
