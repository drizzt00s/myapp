var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');

var indexRouter = require('./routes/index');
var subProductRouter = require('./routes/subProduct');
var pdinfoRouter = require('./routes/pdinfo');
var registRouter = require('./routes/regist');
var loginRouter = require('./routes/login');
var signoutRouter = require('./routes/signout');
var search_content_Router = require('./routes/searchContents')
var searchResultRouter = require('./routes/searchResult')
var user_regist_Router = require('./routes/user_regist');
var user_login_Router = require('./routes/user_login');
var user_profile_Router = require('./routes/user_profile');
var raise_question_Router = require('./routes/raise_question');
var is_signin_Router = require('./routes/isSignin');

var usersRouter = require('./routes/users');


var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(session({
  name:"sessionId",
  secret:"la10018__12Aty"
  // cookie:{maxAge: 60000}
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/subProduct/:sbpId',subProductRouter);
app.use('/sbpId',subProductRouter);
app.use('/pdinfo',pdinfoRouter);
app.use('/regist',registRouter);
app.use('/login',loginRouter);
app.use('/user_regist',user_regist_Router);
app.use('/user_login',user_login_Router);
app.use('/user_profile',user_profile_Router);
app.use('/signout',signoutRouter);
app.use('/searchContents',search_content_Router);
app.use('/searchResult',searchResultRouter);


app.use('/raise_question',raise_question_Router);
app.use('/is_sign_in',is_signin_Router);









app.use('/users', usersRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
