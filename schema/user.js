var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  token: String,
  profile: {
    name: String
  },
  steam: {
    steamid: String,
    communityvisibilitystate: Number,
    profilestate: Number,
    personaname: String,
    lastlogoff: Number,
    commentpermission: Number,
    profileurl: String,
    avatar: String,
    avatarmedium: String,
    avatarfull: String,
    personastate: Number,
    realname: String,
    primaryclanid: String,
    timecreated: Number,
    personastateflags: Number,
    gameextrainfo: String,
    gameid: String,
    loccountrycode: String,
    locstatecode: String,
    loccityid: Number
  }
});

userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('users', userSchema);
