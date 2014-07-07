var mongoose = require('mongoose');
var mods = require('../schema/mod');
var matchResults = require('../schema/result')


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

exports.results = function(req,res){
  var output = {};
  var firstOne = (parseInt(req.params.page)-1)*10;
  res.count = matchResults.count({}, function(err, count){
    if(err) res.send(500, err)
    else
    {
      output.count = count;
      matchResults.find().sort({date: -1}).skip(firstOne).limit(10).exec(function(err, results){
        if(err) res.send(500, err);
        else
          {
            output.results = results;
            res.json(output);
          }
      });
    }
  })
};
