var mongoose = require('mongoose');
var mods = require('../schema/mod');
var nots = require('../schema/not');
var version = require('../version')


console.log("Version: "+version);
exports.index = function(req, res){
  res.locals.version = version;
  res.render('index');
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};

exports.modList = function(req,res){
  mods.find({isPublic: true}, function(err, modL){
    res.json(modL); 
  });
};

exports.notList = function(req, res){
  nots.find({}).exec(function(err, data){
    res.json(data);
  });
};
