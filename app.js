var createError = require('http-errors');
var express = require('express');

process.env.NODE_ENV = "development";
if(process.env.NODE_ENV != "production"){
  require("dotenv").config();
}

var compression = require("compression");
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var db_config = require("./routes/db/db_config");
var utility = require("./public/javascripts/utility");
var rt = require("./routes/router");

var app = express();

const fileUpload = require('express-fileupload');
app.use(fileUpload());

app.use(compression({
  level:6,
  threshold:0
}));

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(session({
  name:"sessionId",
  secret:"la10018__12Aty",
  cookie:{maxAge: 9000000},
  saveUninitialized: false,
  resave: false
}));

// view engine setup
app.set('views', [
//add sub folders under Views folder for html
//once add a new sub-folder under folder Views, it must be explicated listed here
path.join(__dirname, 'views'),
path.join(__dirname, 'views/regist/'),
    path.join(__dirname, 'views/admin/'),
    path.join(__dirname, 'views/checkout/'),
    path.join(__dirname, 'views/communications/'),
    path.join(__dirname, 'views/login/'),
    path.join(__dirname, 'views/productions/'),
    path.join(__dirname, 'views/search/'),
    path.join(__dirname, 'views/service/'),
    path.join(__dirname, 'views/user/'),
]);

app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

rt.initRouter(app);

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
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

//set up socket io
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

    socket.on("adminLandingLc",function(data){
        socket.name = data.name;
        socket.adminLc = 1;
        socket.user_service_Lc_id = '';
    });

    socket.on("userLandingLc",function(data){
        console.log("I am a user, socket id is:" + socket.id);
        const msg = data.msg;
        // const userSocketId = socket.id;
        //user socket id
        io.sockets.sockets.forEach((skt,key)=>{
            if(skt.adminLc == 1){
                skt.emit("lcInstance",{
                    msg:"hello",
                    userSocketId:socket.id
                });
                //if skt.adminLc is not there, it means no admin is in the backstage page /indexLc
                // if(skt.user_service_Lc_id === ''){
                //     socket.admin_service_Lc_id = skt.id;
                //     skt.user_service_Lc_id = socket.id;
                //     io.to(skt.id).emit("lcInstance",{
                //         msg:"hello"
                //     });
                // }
                // console.log("admin lc online");
                // const adminSocketId = skt.id;
                // //admin socket id
                // skt.emit("userLanding",{});
            }
        })
    });

    socket.on("adminLcInstance",function(data){
        const userSocketId = data.userSocketId;
        const instanceId = socket.id;
        //admin socket id

        // socket.userSocketId = userSocketId;
        // //give user's socket id to admin socket id
        io.sockets.sockets.forEach((skt,key)=>{
            if(skt.id == userSocketId){
                skt.adminSocketId = instanceId;
                //give admin socket id to user socket id.
                skt.emit("lc", {
                    msg:data.msg,
                    adminSocketId:instanceId
                });
            }
        })
    });

    socket.on("lcB",function (data) {
        const msg = data.msg;
        const adminSocketId = data.adminSocketId;

        io.sockets.sockets.forEach((skt,key)=>{
            if(skt.id == adminSocketId){
                skt.emit("alc", {
                    msg:msg,
                    adminSocketId:adminSocketId
                });
            }
        })
    });

    socket.on("closeLc",function(){
        //user disconnent lc socket
        io.sockets.sockets.forEach((skt,key)=>{
          if(skt.id == socket.adminSocketId){
              skt.emit("userCloseLc",{
                userSocketId:socket.id
              });
              socket.disconnect();
          }
      })
    });

    socket.on("adminCloseLc",function(){
       //admin disconnent lc socket
      socket.disconnect();
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
            if(skt.user_service_id == ""){
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
  });

  socket.on('disconnect', function (data) {
    checkAdminStatus();
    console.log(socket.adminName + " disconnect.");
  });
})

//初始化连接池
global.pool = utility.createConnectionPool(db_config.host, db_config.username, db_config.password, db_config.port, db_config.database,db_config.pool);

utility.get_nav_data();
utility.get_allPd_spec();
//get all data for navigation, store it in Global
//create a new array for home page display, otherwise the image request is too often.

server.listen(3001,function (){
  console.log("socket running on 3001...");
});

module.exports = app;
