var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');


// var mongoose = require("mongoose");
// var mogoStore = require("connect-mongo")(session);
// require("./mogo/connect");

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
var get_related_pd_Router = require('./routes/get_related_pd');
var live_chat_mail_Router = require('./routes/live_chat_mail');
var live_chat_mail_h_Router = require('./routes/live_chat_mail_h');
var get_userinfo_Router = require('./routes/get_userinfo');
var admin_reply_mail_Router = require('./routes/admin_reply_mail');
var live_chat_Router = require('./routes/live_chat');
var admin_ans_Router = require('./routes/admin_ans');
var admin_Product_Questions_Router = require('./routes/admin_Product_Questions');
var admin_customer_queries_Router = require('./routes/admin_customer_queries');
var del_customer_queries_Router = require('./routes/del_customer_queries');
var update_customer_queries_Router = require('./routes/update_customer_queries');
var get_admin_img_Router = require('./routes/get_admin_img');
var cart_Router = require('./routes/cart');
var add_cart_Router = require('./routes/add_cart');
var update_each_cart_qty_Router = require('./routes/pdate_each_cart_qty');

var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(session({
  name:"sessionId",
  secret:"la10018__12Aty",
  // store:new mogoStore({mongooseConnection:mongoose.connection}),
  // store: new mogoStore({url: 'mongodb://localhost/cart'}),
  cookie:{maxAge: 900000},
  saveUninitialized: false,
  resave: false
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
app.use('/del_customer_queries',del_customer_queries_Router);
app.use('/update_customer_queries',update_customer_queries_Router);
app.use('/get_admin_img',get_admin_img_Router);

app.use('/cart',cart_Router);
app.use('/add_cart',add_cart_Router);
app.use('/update_each_cart_qty',update_each_cart_qty_Router);




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
var lineupUserSocketIds = [];//hold all user socket instance waiting in line.

io.on('connection', (socket) => {

    function contactWaitingUser(){
      var breakFlag = true;
      if(lineupUserSocketIds <= 0){
        //no user is wating.
        // console.log("no user is waiting");
        return false;
      }else{
        if(breakFlag){
          var waitingUserSocket = lineupUserSocketIds.pop();
          io.sockets.sockets.forEach((skt,key)=>{
            if(skt.isAdmin == 1){
              if(skt.user_service_id == ""){
                waitingUserSocket.admin_service_id = skt.id;
                skt.user_service_id = waitingUserSocket.id;
                io.to(waitingUserSocket.id).emit("echo", "An agent is now preparing to chat with you. please wait...");
                io.to(skt.id).emit("admin_echo", "user " + waitingUserSocket.liveChatName + " is connected.please talk to the user.");
                breakFlag = false;
              }
            }
          })
        }
      }
    }
    function checkAdminStatus(){
      //check other admin if are online or not   
      var adminInfo = [];
      io.sockets.sockets.forEach((skt,key)=>{
        if(skt.isAdmin == 1){
          var adminObj = {};
          adminObj.isOnline = "online";
          adminObj.adminName = skt.adminName;
          adminInfo.push(adminObj);
        }
      });
      io.sockets.emit("notify_other_admin_status", adminInfo);
    }
   
    socket.on("adminJoin",function(data){
      socket.adminName = data.adminName;
      socket.isAdmin = 1;
      socket.user_service_id = "" //user socket id
      contactWaitingUser();
    });

    socket.on("check_admin_status", function(data){
      checkAdminStatus();
    });


    socket.on("userJoin",function(data){
      var liveChatName = data.liveChatName;
      socket.liveChatName = liveChatName;
      socket.isAdmin = 0;
      socket.admin_service_id = "";//admin socket id
      var breakFlag = true;
      io.sockets.sockets.forEach((skt,key)=>{
        if(breakFlag){
          if(skt.isAdmin == 1){
            console.log("user_service_id:" + skt.user_service_id);
            if(skt.user_service_id == ""){
              console.log("!!!!!!!!!!!!!!!!!!!!!!!!!");
              console.log("skt.id:" + skt.id);
              socket.admin_service_id = skt.id;
              skt.user_service_id = socket.id;
              io.to(socket.id).emit("echo", "An agent is now preparing to chat with you. please wait...");
              io.to(skt.id).emit("admin_echo", "user " + liveChatName + " is connected.please talk to the user.");
              breakFlag = false;
            }
          }
        }
      })
      console.log("admin_service_id:" + socket.admin_service_id);
      if(socket.admin_service_id == ""){
        //no admin socket avliable.
        lineupUserSocketIds.push(socket);
        socket.emit("all_admin_busy","All agents are busy,please wait a minute, or we will contact you soon.");
      }
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
    io.to(socket.admin_service_id).emit("user-disconnect", "user " + socket.liveChatName + " has closed the connection.");
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

  socket.on("manual-disconnectionAdmin",function (data) {
    io.to(socket.user_service_id).emit("admin-disconnect", "Admin has closed the connection. Good bye.");
    // io.sockets.sockets.forEach((skt,key)=>{
    //   if(skt.isAdmin == 0){
    //     if(skt.id == socket.user_service_id){
    //       socket.user_service_id = "";
    //       skt.disconnect();
    //     }
    //   }
    // })
    // setTimeout(contactWaitingUser,2000);
  });

  socket.on('disconnect', function (data) {
    checkAdminStatus();
      
      // if(socket.isAdmin == 1){
      //   var adminName = socket.adminName;
      //   io.sockets.emit("notify_other_admsdin_status", adminInfo);
        
      // }
    
      // setTimeout(cc, 0);
      console.log(socket.adminName + " disconnect.");
  });

  // function cc(){
  //   var adminInfo = [];
  //   io.sockets.sockets.forEach((skt,key)=>{
  //     if(skt.isAdmin == 1){
  //       var adminObj = {};
  //       adminObj.isOnline = "online";
  //       adminObj.adminName = skt.adminName;
  //       adminInfo.push(adminObj);
  //     }
  //   });
  //   io.sockets.emit("notify_other_admin_status", adminInfo);
  // }

  






})


server.listen(3001,function (){
  console.log("socket running on 3001...");
});


module.exports = app;
