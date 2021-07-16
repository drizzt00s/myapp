var express = require('express');
var utility = require("../../public/javascripts/utility");
var db_config = require("../db/db_config");
var router = express.Router();

router.post("/", function(req, res, next){
    var newPass = req.body.newPass;
    var currentPass = req.body.currentPass;
    var mail = req.session.userData.account;

    var md5 = utility.toCrypto();
    var password_login_sec = md5.update(currentPass).digest('hex');

    var sql = "SELECT password FROM user WHERE email=" + "'" + mail +"'";

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
        connection.query(sql,function(err, result){
            if(err){
                throw err;
            }
            var s_pwd = result[0].password;
            if(s_pwd !== password_login_sec){
                //当前密码不正确
                connection.release();
                res.send({
                    code:1,
                    data:"Your current password is not correct."
                });

            } else{
                var md5 = utility.toCrypto();
                var currentPassdigest = md5.update(newPass).digest('hex');
                var sql = "update user set password=" + "'" + currentPassdigest + "'" + " where email=" + "'" + mail + "'";
                connection.query(sql, function (err, result) {
                    if(err){
                        throw err;
                    }
                    connection.release();
                    res.send({
                        code:1,
                        data:"update password success."
                    });
                });

            }







        })
    });


});
module.exports = router;