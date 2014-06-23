var mongoose = require('mongoose');

var keySchema = mongoose.Schema({
  //ID is the token (guid string)
  _id: String,
  //Sender UserID
  sender: String,
  //Receiver UserID
  activated: Boolean,
  receiver: String,
  //Receiver name
  receiver_nick: String,
  date_created: Date,
  date_activated: Date,
  isDonateKey: Boolean
});

module.exports = mongoose.model('inviteKeys', keySchema, 'inviteKeys');
