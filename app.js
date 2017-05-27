//Dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Modules
var index = require('./routes/index');
var login = require('./routes/login');
var team = require('./routes/team');
var gold = require('./routes/gold');
var character = require('./routes/character');

var app = express();
var port = process.env.ELEPHANTSQL_URL || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', index);
app.use('/login', login);
app.use('/team', team);
app.use('/gold', gold);
app.use('/character', character);

//Catch 404
app.use(function(request, response, next) {
  var error = new error('Not Found');
  error.status = 404;
  next(error);
});

//error handler
app.use(function(error, request, response, next) {
  response.locals.message = error.message;
  response.locals.error = request.app.get('env') === 'development' ? error : {};
  response.status(error.status || 500);
  response.render('error');
});

//Exporting module
module.exports = app;
