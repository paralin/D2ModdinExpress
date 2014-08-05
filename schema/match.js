var mongoose = require('mongoose');

var matchSchema = mongoose.Schema({
  mod: String,
  ranked: Boolean,
  automatic_surrender: Boolean,
  date: Number,
  duration: Number,
  first_blood_time: Number,
  good_guys_win: Boolean,
  mass_disconnect: Boolean,
  match_id: String,
  num_players: [Number],
  server_addr: String,
  teams: [{players: [{
    assists: Number,
    account_id: Number,
    steam_id: String,
    user_id: String,
    claimed_denies: Number,
    claimed_farm_gold: Number,
    deaths: Number,
    denies: Number,
    gold: Number,
    gold_per_min: Number,
    hero_damage: Number,
    hero_healing: Number,
    hero_id: Number,
    items: [Number],
    kills: Number,
    last_hits: Number,
    leaver_status: Number,
    level: Number,
    tower_damage: Number,
    xp_per_minute: Number
  }]}],
  steamids: [String]
});

module.exports = mongoose.model('matchResults', matchSchema, "matchResults");
