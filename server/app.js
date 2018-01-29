var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var index = require('./routes/index');
var users = require('./routes/users');
var daily = require('./routes/daily');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session
var session = require("express-session");
app.use(session({
  secret:"me",
  resave:false,
  saveUninitialized:true
}));
// svg-captcha
var svgCaptcha = require('svg-captcha');
app.get('/api/captcha', function (req, res) {
  // var captcha = svgCaptcha.createMathExpr(); 生成算法
  var captcha = svgCaptcha.create({ignoreChars: '0o1iIl'});
  console.log(captcha.text)
  req.session.captcha = captcha.text;
  res.type('svg');
  res.status(200).send(captcha.data);
});

app.use('/', index);
app.use('/users', users);
app.use('/daily', daily);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
