var mongoose = require('mongoose');
var mods = require('../schema/mod');
var nots = require('../schema/not');


exports.index = function(req, res){
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
  nots.find({}).cache().exec(function(err, data){
    res.json(data);
  });
};
