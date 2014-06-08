var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  morgan = require('morgan'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  stylus = require('stylus'),
  nib = require('nib'),
  path = require('path');

require('coffee-script/register');

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
app.use(stylus.middleware(
  {
    src: __dirname+'/public'
  , compile: compile
  }
));
app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

var env = process.env.NODE_ENV || 'development';


app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

app.get('*', routes.index);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
