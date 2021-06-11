var express = require('express');
var utility = require("../public/javascripts/utility");
var db_config = require("./db/db_config");
var router = express.Router();

router.post('/', function(req, res, next) {
    var pid = req.body.pid;
    var sql = "SELECT * FROM ques WHERE pid" + "=?";
    var sqlValue = [pid];

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
            res.send({
                code:1,
                data:result
            });
        })
    });


    // global.pool.query(sql,sqlValue,function(err, result){
    //     if(err){
    //         throw  err;
    //     }
    //     res.send({
    //         code:1,
    //         data:result
    //     });
    // })
});
module.exports = router;