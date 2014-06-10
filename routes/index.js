var mongoose = require('mongoose');
var modSchema = require('../schema/mod');

var mods = mongoose.model('mods', modSchema);

exports.index = function(req, res){
  res.render('index');
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};

exports.modList = function(req,res){
  mods.find({}, function(err, modL){
    res.json(modL);  
  });
};
