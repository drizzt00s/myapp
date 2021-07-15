var express = require('express');
var utility = require("../../public/javascripts/utility");
var db_config = require("../db/db_config");
var router = express.Router();

router.post('/', function(req, res, next) {

    //check is this a loggined user or unloggined user.
    var isUserLogin = req.session.userData ? true : false;

    if(isUserLogin){
        var acct_mail = req.session.userData.account;
        //acct_mail 用户登录账号 user表字段中的email

        var quote_name = req.body.contents.name;
        var quote_mail = req.body.contents.mail;
        var quote_contents = req.body.contents.contents;
        var quote_number = utility.createQuoteNo(10);

        var sqlValue = [quote_name,quote_mail,quote_contents,quote_number,acct_mail];
        var sql = "INSERT INTO quote (name,mail,quote_contents,quote_number,acct_mail) VALUES(?,?,?,?,?)";
    } else{
        //if this is a anonymous user, don't create a quote number. quote can't be tracked in server and only
        // send him a mail.
        var quote_name = req.body.contents.name;
        var quote_mail = req.body.contents.mail;
        var quote_contents = req.body.contents.contents;

        var sqlValue = [quote_name,quote_mail,quote_contents];
        var sql = "INSERT INTO quote_anonymous (name,mail,quote_contents) VALUES(?,?,?)";
    }

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

        connection.query(sql,sqlValue, function(err, result){
            if(err){
                throw err;
            }

            connection.release();

            if(isUserLogin){

                res.send({
                    code:1,
                    quote_number:quote_number,
                    isUserLogin:isUserLogin
                });
            }else{

                res.send({
                    code:1,
                    isUserLogin:isUserLogin
                });
            }

        })
    });


});

module.exports = router;