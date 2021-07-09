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
// var sharp = require("sharp");


var db_config = require("./routes/db/db_config");
var utility = require("./public/javascripts/utility");


//static
var indexRouter = require('./routes/static/index');
var subProductRouter = require('./routes/static/subProduct');
var pdinfoRouter = require('./routes/static/pdinfo');
var registRouter = require('./routes/static/regist');
var loginRouter = require('./routes/static/login');
var signoutRouter = require('./routes/static/signout');
var searchResultRouter = require('./routes/static/searchResult')
var user_profile_Router = require('./routes/static/user_profile');
var is_signin_Router = require('./routes/static/isSignin');
var admin_answer_Router = require('./routes/static/admin_answer');
var admin_login_Router = require('./routes/static/admin_login');
var admin_signout_Router = require('./routes/static/admin_signout');
var live_chat_mail_Router = require('./routes/static/live_chat_mail');
var admin_reply_mail_Router = require('./routes/static/admin_reply_mail');
var admin_ans_Router = require('./routes/static/admin_ans');
var admin_Product_Questions_Router = require('./routes/static/admin_Product_Questions');
var admin_customer_queries_Router = require('./routes/static/admin_customer_queries');
var cart_Router = require('./routes/static/cart');
var confirm_order_Router = require('./routes/static/confirm_order');
var my_dashboard_Router = require('./routes/static/my_dashboard');
var my_dashboard_addressbook_Router = require('./routes/static/my_dashboard_addressbook');
var sub_pdinfo_Router = require('./routes/static/sub_pdinfo');
var admin_quotes_Router = require('./routes/static/admin_quotes');
var orderPayment_Router = require('./routes/static/orderPayment');
var orderPaymentPaypal_Router = require('./routes/static/orderPaymentPaypal');
var paymentSuccess_Router = require('./routes/static/paymentSuccess');
var order_history_Router = require('./routes/static/order_history');
var order_history_details_Router = require('./routes/static/order_history_details');




//api
var search_content_Router = require('./routes/api/searchContents')
var user_regist_Router = require('./routes/api/user_regist');
var user_login_Router = require('./routes/api/user_login');
var raise_question_Router = require('./routes/api/raise_question');
var admin_signin_Router = require('./routes/api/admin_signin');
var admin_reply_Router = require('./routes/api/admin_reply');
var qa_Router = require('./routes/api/qa');
var get_related_pd_Router = require('./routes/api/get_related_pd');
var live_chat_mail_h_Router = require('./routes/api/live_chat_mail_h');
var get_userinfo_Router = require('./routes/api/get_userinfo');
var live_chat_Router = require('./routes/api/live_chat');
var del_customer_queries_Router = require('./routes/api/del_customer_queries');
var update_customer_queries_Router = require('./routes/api/update_customer_queries');
var get_admin_img_Router = require('./routes/api/get_admin_img');
var add_cart_Router = require('./routes/api/add_cart');
var update_each_cart_qty_Router = require('./routes/api/pdate_each_cart_qty');
var del_cart_pd_Router = require('./routes/api/del_cart_pd');
var confirm_checkout_data_Router = require('./routes/api/confirm_checkout_data');
var add_shipping_address_Router = require('./routes/api/add_shipping_address');
var add_billing_address_Router = require('./routes/api/add_billing_address');
var set_default_address_Router = require('./routes/api/set_default_address');
var del_shipping_address_Router = require('./routes/api/del_shipping_address');
var del_billing_address_Router = require('./routes/api/del_billing_address');
var edit_shipping_addr_Router = require('./routes/api/edit_shipping_addr_address');
var ask_quote_Router = require('./routes/api/ask_quote');
var order_payment_Router = require('./routes/api/order_payment');
var payment_Router = require('./routes/api/payment');
var get_order_history_Router = require('./routes/api/get_order_history');
var get_order_history_details_Router = require('./routes/api/get_order_history_details');

var get_Acct_data_Router = require('./routes/api/get_Acct_data');

var reply_quote_Router = require('./routes/api/reply_quote');

var app = express();

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
app.use('/del_cart_pd',del_cart_pd_Router);
app.use('/confirm_order',confirm_order_Router);
app.use('/confirm_checkout_data',confirm_checkout_data_Router);
app.use('/add_shipping_address',add_shipping_address_Router);
app.use('/add_billing_address',add_billing_address_Router);
app.use('/my_dashboard',my_dashboard_Router);
app.use('/my_dashboard_addressbook',my_dashboard_addressbook_Router);
app.use('/set_default_address',set_default_address_Router);
app.use('/del_shipping_address',del_shipping_address_Router);
app.use('/del_billing_address',del_billing_address_Router);
app.use('/edit_shipping_addr',edit_shipping_addr_Router);
app.use('/sub_pdinfo',sub_pdinfo_Router);
app.use('/ask_quote',ask_quote_Router);
app.use('/admin_quotes',admin_quotes_Router);
app.use('/orderPayment',orderPayment_Router);
app.use('/order_payment',order_payment_Router);
app.use('/payment',payment_Router);
app.use('/orderPaymentPaypal',orderPaymentPaypal_Router);
app.use('/paymentSuccess',paymentSuccess_Router);
app.use('/order_history',order_history_Router);
app.use('/get_order_history',get_order_history_Router);
app.use('/order_history_details',order_history_details_Router);
app.use('/get_order_history_details',get_order_history_details_Router);
app.use('/get_Acct_data',get_Acct_data_Router);


app.use('/reply_quote',reply_quote_Router);


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
