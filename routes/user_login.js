var express = require('express');
var mysql = require("mysql");
var utility = require("../public/javascripts/utility");
var router = express.Router();
var mongoose = require('mongoose');

router.post("/", function(req, res, next){
    var email_login = req.body.email_login;
    var password_login = req.body.password_login;
    var md5 = utility.toCrypto();
    var password_login_sec = md5.update(password_login).digest('hex');
    var sql = "SELECT * From user WHERE email" + "=?";
    var sqlValue = [email_login];
    var connection = utility.createConnection("localhost", "root", "YES", "3306", "app");
    utility.connect(connection);
    connection.query(sql,sqlValue,function(err, result){
        if(err){
            throw err;
        }
        if(result.length <= 0){
            var data = {
                 code:0
            };
            connection.end();
            res.send(data);
        } else {
            //账号存在 检查密码
            var s_pwd = result[0].password;
            var s_acct = result[0].email;
            // var passPwd = md5.update(password_login).digest('hex');
            if(s_pwd === password_login_sec){
                var sql = "SELECT carts From cart WHERE mail" + "=?";
                var sqlValue = [email_login];
                connection.query(sql,sqlValue,function(err, result){
                    connection.end();
                    //查出cart内数据
                    var data = {
                        code:2,
                        acct:s_acct
                    };
                    var userData = {"account":s_acct};
                    req.session.userData = userData;
                    var dbCart = JSON.parse(result[0].carts);
                    req.session.cart = dbCart ? dbCart : {pdList:[],cartPrice:''}
                    console.log(req.session.cart );
                    res.send(data);
                })
            } else {
                connection.end();
                //密码不正确
                var data = {
                    code :1
                };
                res.send(data);
            }
        }
    });


});
module.exports = router;