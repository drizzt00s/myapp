var express = require('express');
var utility = require("../../public/javascripts/utility");
var db_config = require("../db/db_config");
var router = express.Router();

router.post("/", function(req, res, next){
    var acct = req.body.acct;
    var pwd = req.body.pwd;
    var md5 = utility.toCrypto();
    //var password_login_sec = md5.update(pwd).digest('hex');
    var password_login_sec = pwd;
    var sql = "SELECT * From admin WHERE account" + "=?";
    var sqlValue = [acct];

    var pool = global.pool ? global.pool :utility.createConnectionPool(
        db_config.host,
        db_config.username,
        db_config.password,
        db_config.port,
        db_config.database,db_config.pool);

    pool.getConnection(function(err,connection){
        if(err){
            throw err;
        }
        connection.query(sql,sqlValue,function(err, result){
            if(err){
                throw err;
            }
            if(result.length <= 0){
                var data = {
                    code:0
                };
                connection.release();
                res.send(data);
            } else {
                //账号存在 检查密码
                var s_pwd = result[0].password;
                var s_acct = result[0].account;
                if(s_pwd === password_login_sec){
                    connection.release();
                    var data = {
                        code:2,
                        acct:s_acct
                    };
                    req.session.adminData = {"account":s_acct};
                    res.send(data);
                } else {
                    connection.release();
                    //密码不正确
                    var data = {
                        code :1
                    };
                    res.send(data);
                }
            }
        })
    });


    // global.pool.query(sql,sqlValue,function(err, result){
    //     if(err){
    //         throw err;
    //     }
    //     if(result.length <= 0){
    //         var data = {
    //             code:0
    //         };
    //         res.send(data);
    //     } else {
    //         //账号存在 检查密码
    //         var s_pwd = result[0].password;
    //         var s_acct = result[0].account;
    //         if(s_pwd === password_login_sec){
    //             var data = {
    //                 code:2,
    //                 acct:s_acct
    //             };
    //             req.session.adminData = {"account":s_acct};
    //             res.send(data);
    //         } else {
    //             //密码不正确
    //             var data = {
    //                 code :1
    //             };
    //             res.send(data);
    //         }
    //     }
    // });













});
module.exports = router;