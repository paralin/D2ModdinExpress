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
nib = require('nib'),
cookieParser = require('cookie-parser'),
bodyParser = require('body-parser'),
session = require('express-session'),
path = require('path');
require('coffee-script/register');

mongoose.connect(process.env.MONGO_URL||"mongodb://localhost/d2moddin");

var MongoStore = require('connect-mongo')(session);

var app = module.exports = express();

function compile(str, path){
  return stylus(str)
  .set('filename', path)
  .use(nib());
}

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(cookieParser(process.env.SESSION_SECRET||"justanrpg"));
app.use(bodyParser());
app.use(session({
  secret: process.env.SESSION_SECRET||"justanrpg",
  cookie: {
    maxAge: 1800000
  },
  store: new MongoStore({
    url: process.env.MONGO_URL||"mongodb://localhost/d2moddin",

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

app.get('/data/authStatus', function(req, res){
  var resp = {};
  resp.isAuthed = req.user != null;
  resp.user = req.user;
  resp.token = req.sessionID;
  res.json(resp);
});

app.get('*', routes.index);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
