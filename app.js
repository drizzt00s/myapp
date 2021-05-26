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
var admin_answer_Router = require('./routes/admin_answer');
var admin_login_Router = require('./routes/admin_login');
var admin_signin_Router = require('./routes/admin_signin');
var admin_reply_Router = require('./routes/admin_reply');
var admin_signout_Router = require('./routes/admin_signout');
var qa_Router = require('./routes/qa');
var usersRouter = require('./routes/users');
var get_related_pd_Router = require('./routes/get_related_pd');
var live_chat_mail_Router = require('./routes/live_chat_mail');
var live_chat_mail_h_Router = require('./routes/live_chat_mail_h');
var get_userinfo_Router = require('./routes/get_userinfo');
var admin_reply_mail_Router = require('./routes/admin_reply_mail');
var live_chat_Router = require('./routes/live_chat');
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
app.use('/is_sign_in',is_signin_Router);
app.use('/raise_question',raise_question_Router);
app.use('/admin_answer',admin_answer_Router);
app.use('/admin_login',admin_login_Router);
app.use('/admin_signin',admin_signin_Router);
app.use('/admin_reply',admin_reply_Router);
app.use('/admin_signout',admin_signout_Router);
app.use('/qa',qa_Router);
app.use('/get_related_pd',get_related_pd_Router);
app.use('/live_chat_mail',live_chat_mail_Router);
app.use('/live_chat_mail_h',live_chat_mail_h_Router);
app.use('/get_userinfo',get_userinfo_Router);
app.use('/admin_reply_mail',admin_reply_mail_Router);
app.use('/live_chat',live_chat_Router);


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

const server = require('http').createServer(app);
const io = require('socket.io')(server,{cors:{origin:"*"}});
const adminSocketsId = [];
var userSocketId = "";
var thisAdminSocketId = "";
io.on('connection', (socket) => {
    socket.emit("echo","An agent is now preparing to chat with you. please wait...");
    userSocketId = socket.id;
    socket.on("message",function (d){
      io.sockets.sockets.forEach((skt,key)=>{
        //all socket instances
        if(skt.id == adminSocketsId[0]){
          thisAdminSocketId = skt.id;
          return false;
        }
      })
      io.to(thisAdminSocketId).emit("privateChat", d);
    });

    socket.on("privateChat_return",function (d) {
      io.to(userSocketId).emit("privateChat_return_user", d);
    });








  socket.on("adminJoin",function(data){
    socket.isAdmin = 1;
    adminSocketsId.push(socket.id);
  });
  socket.on("userJoin",function(data){
    socket.isAdmin = 0;
  });


  socket.on("manual-disconnection",function (data) {
    console.log(data + " should be closed");
    socket.disconnect();
    console.log(io.allSockets());
  });

})


server.listen(3001,function (){
  console.log("socket running on 3001...");
});


module.exports = app;
