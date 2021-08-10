var express = require('express');
var utility = require("../../public/javascripts/utility");
var db_config = require("../db/db_config");
var router = express.Router();

router.get("/", function(req, res, next){
    var userData = req.session.userData;
    if(!userData){
        res.send({
            code:0
        })
    }
    else{
        var sql = "SELECT * From user WHERE email" + "=?";
        var sqlValue = [userData.account];

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
            connection.query(sql,sqlValue,function(err, data){
                if(err){
                    throw err;
                }
                connection.release();
                var fullname = data[0].lastName + " " + data[0].firstName;
                res.send({
                    code:1,
                    d:fullname
                });
            })
        });

    }
   
});

module.exports = router;