var express = require('express');
var utility = require("../public/javascripts/utility");
var router = express.Router();

router.get('/', function(req, res, next) {
    // var isSignin = utility.isSignin(req);
    // if(!isSignin){
    //     res.render("live_chat_mail");
    // }else {
    //     var email = req.session.userData.account;
    //     var connection = utility.createConnection("localhost", "root", "YES", "3306", "app");
    //     utility.connect(connection);
    //     connection.query("select * from user where email=" + "'" + email +"'",function (err,data) {
    //         if(err){
    //             throw err;
    //         }
    //         console.log(data);
    //     })
    // }
    res.render("live_chat_mail");


});

module.exports = router;