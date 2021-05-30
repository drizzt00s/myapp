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

var admin_ans_Router = require('./routes/admin_ans');
var admin_Product_Questions_Router = require('./routes/admin_Product_Questions');

var admin_customer_queries_Router = require('./routes/admin_customer_queries');


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
app.use('/admin_ans',admin_ans_Router);
app.use('/admin_Product_Questions',admin_Product_Questions_Router);

app.use('/admin_customer_queries',admin_customer_queries_Router);




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
var adminSocketsId = [];//hold all online admin socket id
var lineupUserSocketIds = [];//hold all user socket instance waiting in line.



io.on('connection', (socket) => {

    function contactWaitingUser(){
      var breakFlag = true;
      if(lineupUserSocketIds <= 0){
        //no user is wating.
        return false;
        console.log("no user is wating");
      }else{
        if(true){
          var waitingUserSocket = lineupUserSocketIds.pop();
          io.sockets.sockets.forEach((skt,key)=>{
            if(skt.isAdmin == 1){
              if(skt.user_service_id == ""){
                waitingUserSocket.admin_service_id = skt.id;
                skt.user_service_id = waitingUserSocket.id;
                io.to(waitingUserSocket.id).emit("echo", "An agent is now preparing to chat with you. please wait...");
                io.to(skt.id).emit("admin_echo", "An user is connected.please talk to the user.");
                return false;
              }
            }
          })
        }
      }
    }
   
    socket.on("adminJoin",function(data){
      socket.isAdmin = 1;
      socket.user_service_id = "" //user socket id

      // if(lineupUserSocketIds.length <= 0){
      //   //no waiting user
      //   adminSocketsId.push(socket.id);
      // } else {
      //   //handle waiting user
      //   var lineupUserSocketId = lineupUserSocketIds.pop();
      //   socket.userSocketId = lineupUserSocketId;
      //   io.sockets.sockets.forEach((skt,key)=>{
      //     if(skt.id == lineupUserSocketId){
      //       skt.adminSocketId = socket.id;
      //       return false;
      //     }
      //   })
      // }
    });

    socket.on("userJoin",function(data){
      socket.isAdmin = 0;
      socket.admin_service_id = "";//admin socket id

    
      var breakFlag = true;
      io.sockets.sockets.forEach((skt,key)=>{
        if(breakFlag){
          if(skt.isAdmin == 1){
            if(skt.user_service_id == ""){
              socket.admin_service_id = skt.id;
              skt.user_service_id = socket.id;
              io.to(socket.id).emit("echo", "An agent is now preparing to chat with you. please wait...");
              io.to(skt.id).emit("admin_echo", "An user is connected.please talk to the user.");
              breakFlag = false;
            }
          }
        }
      })

      // for(var i = 0; i < io.sockets.sockets.length; i++){
      //   if(io.sockets.sockets[i].isAdmin == 1){
      //     if(io.sockets.sockets[i].user_service_id == ""){
      //       socket.admin_service_id = io.sockets.sockets[i].id;
      //       io.sockets.sockets[i].user_service_id = socket.id;
      //       io.to(socket.id).emit("echo", "An agent is now preparing to chat with you. please wait...");
      //       io.to(io.sockets.sockets[i].id).emit("admin_echo", "An user is connected.please talk to the user.");
      //       return false;
      //     }
      //   }
      // }



      if(socket.admin_service_id == ""){
        //no admin socket avliable.
        lineupUserSocketIds.push(socket);
        socket.emit("all_admin_busy","All agents are busy,please wait a minute, or we will contact you soon.");
      }



      // socket.inwaiting = true;
      // io.sockets.sockets.forEach((skt,key)=>{
      //   if(skt.isAdmin == 1){
      //     if(!socket.isOccpuied){
      //       socket.adminSocketId = skt.id;
      //       skt.userSocketId = socket.id;
      //       skt.isOccpuied = true;
      //       socket.inwaiting = false;
      //       return false;
      //     }
      //   }
      // })
      // if(socket.inwaiting){
      //   socket.emit("all_admin_busy","All agents are busy,please wait a minute, or we will contact you soon.");
      // }else{
      //   io.to(socket.id).emit("echo", "An agent is now preparing to chat with you. please wait...");
      // }
     
   
      //程序分配某一个amdin socket instance 给这个用户
      // console.log("adminSocketsId:"  +  adminSocketsId.length);
      // if(adminSocketsId.length > 0){
      //   var thisAdminSocketId = adminSocketsId.pop();
      //   io.sockets.sockets.forEach((skt,key)=>{
      //     if(skt.id == thisAdminSocketId){
      //       socket.adminSocketId = skt.id;
      //       skt.userSocketId = socket.id;
      //       io.to(socket.id).emit("echo", "An agent is now preparing to chat with you. please wait...");
      //       return false;
      //     }
      //   })
      // }else{
      //   socket.emit("all_admin_busy","All agents are busy,please wait a minute, or we will contact you soon.");
      //   lineupUserSocketIds.push(socket.id);
      // }
    });

    socket.on("message",function (d){
      io.to(socket.admin_service_id).emit("privateChat", d);
    });

    socket.on("privateChat_return",function (d) {
      io.to(socket.user_service_id).emit("privateChat_return_user", d);
    });

  //   socket.on("notify_admin",function (data){
  //     io.to(socket.adminSocketId).emit("admin_echo", data.liveChatName +" is connected.please talk to the user.");
  //   });


  socket.on("manual-disconnection",function (data) {
    io.to(socket.admin_service_id).emit("user-disconnect", 'user disconnects.');
    io.sockets.sockets.forEach((skt,key)=>{
      if(skt.isAdmin == 1){
        if(skt.user_service_id == socket.id){
          socket.admin_service_id = "";
          skt.user_service_id = "";
        }
      }
    })
    socket.disconnect();
    setTimeout(contactWaitingUser,2000);
    
    // console.log(io.allSockets());
  });

  socket.on('disconnect', function () {
      console.log("disconnect.");
  });

})


server.listen(3001,function (){
  console.log("socket running on 3001...");
});


module.exports = app;
