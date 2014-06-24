var express = require('express'),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
morgan = require('morgan'),
routes = require('./routes'),
http = require('http'),
stylus = require('stylus'),
mongoose = require('mongoose'),
passport = require('passport'),
flash = require('connect-flash'),
favicon = require('serve-favicon'),
nib = require('nib'),
cookieParser = require('cookie-parser'),
bodyParser = require('body-parser'),
session = require('express-session'),
path = require('path'),
cluster = require('cluster');
require('coffee-script/register');
var _ = require('underscore');

var cacheOpts = {
    max:100,
    maxAge:1000*60*2//cache for 2min
};
require('mongoose-cache').install(mongoose, cacheOpts);

var useCluster = process.env.USE_CLUSTER != null;

//process.on('uncaughtException', function(err) {
//    console.log('Caught exception: ' + err);
//});

http.globalAgent.maxSockets = 100;
if(cluster.isMaster&&useCluster){
  var cpuCount = 10;
  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }
  cluster.on('exit', function (worker) {
    console.log('Worker ' + worker.id + ' died :(');
    cluster.fork();
  });
}else{
  var mongooptions = {
    db: { native_parser: true  },
    server: { poolSize: 15  }
  }
  mongooptions.server.socketOptions = { keepAlive: 1  };
  mongoose.connect(process.env.MONGO_URL, mongooptions, function(err){
    if(err)
      console.log(err);
    InviteKey = require('./schema/invitekey');
    InviteQueue = require('./schema/invitequeue');

    var MongoStore = require('connect-mongo')(session);

    var app = module.exports = express();

    function compile(str, path){
      return stylus(str)
      .set('filename', path)
      .use(nib());
    }

    queueStats = {}

    updateQueueStats = function(){ 
      InviteQueue.count({}, function(err, count){//Use invited:false?
        queueStats.totalCount = count;
      });
      InviteQueue.findOne({invited: false}).sort({_id: 1}).cache().exec(function(err, queue){
        queueStats.totalInvited = queue._id-1;
      });
    };
    updateQueueStats();
    setInterval(updateQueueStats, 60000);

    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    if(process.env.NODE_ENV !== "production")
      app.use(morgan('dev'));
    app.use(favicon(__dirname + '/public/images/favicon.png'));
    app.use(cookieParser(process.env.SESSION_SECRET||"justanrpg"));
    app.use(bodyParser());
    app.use(session({
      secret: process.env.SESSION_SECRET||"justanrpg",
      cookie: {
        maxAge: 86400000
      },
      store: new MongoStore({
        url: process.env.MONGO_URL||"mongodb://localhost/d2moddin"
      })
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    app.use(stylus.middleware(
      {
      src: __dirname+'/public'
  , compile: compile
    }
    ));
    app.use(methodOverride());
    app.use(express.static(path.join(__dirname, 'public')));

    require('./config/passport')(passport);

    var env = process.env.NODE_ENV || 'development';

    app.get('/', routes.index);
    app.get('/partials/:name', routes.partials);
    app.get('/data/mods', routes.modList);

    //Auth
    app.get('/auth/steam', passport.authenticate('steam', {failureRedirect: '/'}), function(req, res){ res.redirect('/'); });

    app.get('/auth/steam/return', passport.authenticate('steam', {failureRedirect: '/'}), function(req, res){ res.redirect('/'); });

    app.get('/logout', function(req, res){
      req.logout();
      res.redirect('/');
    });

    app.post('/queue/tryUseKey', function(req, res){
      var resp = {};
      if(req.user){
        InviteQueue.findOne({'steam_id': req.user.steam.steamid}, function(err, queue){
          if(queue){
            if(queue.invited){
              resp.error = "You are already invited to D2Moddin.";
              res.json(resp);
            }else{
              req.body.key = req.body.key.toUpperCase();
              InviteKey.findOne({'_id': req.body.key}, function(err, key){
                if(!key){
                  resp.error = "That key is not found.";
                  res.json(resp);
                }else{
                  if(key.activated){
                    resp.error = "That key has already been used.";
                    res.json(resp);
                  }else{
                    key.activated = true;
                    key.date_activated = new Date();
                    key.receiver = req.user.steam.steamid;
                    key.receiver_nick = req.user.profile.name;
                    key.save();
                    queue.invited = true;
                    queue.invite_key = key._id;
                    queue.date_invited = new Date();
                    queue.save();
                    res.json(resp);
                  }
                }
              });
            }
          }else{
            resp.error = "Please join the queue first.";
            res.json(resp);
          }
        }); 
      }else{
        resp.error = "You are not signed in.";
        res.json(resp);
      }
    });
    app.post('/queue/joinQueue', function(req, res){
      var resp = {};
      if(req.user){
        //Find existing queue entry
        InviteQueue.findOne({'steam_id': req.user.steam.steamid}, function(err, queue){
          if(queue){
            resp.error = "You are already in the queue."
            res.json(resp);
          }else{
            InviteQueue.findOne().sort("-_id").exec(function(err, doc){
              var id = 0;
              if(doc)
                id = doc._id+1;
              var queueEntry = new InviteQueue({
                _id: id,
                steam_id: req.user.steam.steamid,
                invited: false,
                invite_key: null,
                date_invited: new Date()
              });
              queueEntry.save(function(err){
                if(err){
                  resp.error = JSON.stringify(err);
                  console.log(err);
                }
                res.json(resp);
              });
            })
          }
        }); 
      }else{
        resp.error = "You are not signed in.";
        res.json(resp);
      }
    });
    app.get('/data/authStatus', function(req, res){
      var resp = {};
      resp.isAuthed = req.user != null;
      resp.queue = _.clone(queueStats);
      if(req.user){
        resp.token = req.sessionID;
        resp.user = {
          _id: req.user._id,
          steam: req.user.steam,
          profile: req.user.profile,
          authItems: req.user.authItems
        };
        InviteQueue.findOne({'steam_id': resp.user.steam.steamid}).cache().exec(function(err, queue){
          if(err)
            return done(err);
          if(queue){
            resp.queue.inQueue = true;
            resp.queue.invited = queue.invited;
            resp.queue.queueID = queue._id;
          }else{
            resp.queue.inQueue = false;
          }
          res.json(resp);
        });
      }else{
        res.json(resp);
      }
    });

    app.get('*', routes.index);

    http.createServer(app).listen(app.get('port'), function () {
      if(useCluster)
        console.log('Worker '+cluster.worker.id+' running on port ' + app.get('port'));
      else
        console.log('Server running on port '+app.get('port'));
    });

  });
}
