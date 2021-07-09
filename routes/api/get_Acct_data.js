var express = require('express');
var utility = require("../../public/javascripts/utility");
var db_config = require("../db/db_config");
var router = express.Router();

router.get("/", function(req, res, next){
    if(!req.session.userData){
        throw new Error("user session data doesn't exit");
    }
    var mail = req.session.userData.account;
    var sql = "SELECT firstName,lastName FROM user WHERE email=" + "'" + mail + "'";
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
            connection.release();
            res.send({code:1,
                data:{
                    mail:mail,
                    name:result
                }
            });
        })
    });




});

module.exports = router;