var express = require('express');
var utility = require("../../public/javascripts/utility");
var db_config = require("../db/db_config");
var router = express.Router();



router.post("/", function(req, res, next){
    var email_login = req.body.email_login;
    var password_login = req.body.password_login;
    var md5 = utility.toCrypto();
    var password_login_sec = md5.update(password_login).digest('hex');
    var sql = "SELECT * From user WHERE email" + "=?";
    var sqlValue = [email_login];
    global.pool.query(sql,sqlValue,function(err, result){
        if(err){
            throw err;
        }
        if(result.length <= 0){
            var data = {
                 code:0
            };
            res.send(data);
        } else {
            //账号存在 检查密码
            var s_pwd = result[0].password;
            var s_acct = result[0].email;
            if(s_pwd === password_login_sec){
                var sql = "SELECT carts From cart WHERE mail" + "=?";
                var sqlValue = [email_login];

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
                        connection.release();
                        //查出cart内数据
                        var data = {
                            code:2,
                            acct:s_acct
                        };
                        var userData = {"account":s_acct};
                        req.session.userData = userData;
                        var dbCart = JSON.parse(result[0].carts);
                        req.session.cart = dbCart ? dbCart : {pdList:[],cartPrice:''}
                        res.send(data);
                    })
                });
            } else {
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