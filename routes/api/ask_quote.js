var express = require('express');
var utility = require("../../public/javascripts/utility");
var db_config = require("../db/db_config");
var router = express.Router();

router.post('/', function(req, res, next) {

    var quote_name = req.body.contents.name;
    var quote_mail = req.body.contents.mail;
    var quote_contents = req.body.contents.contents;
    
    var sqlValue = [quote_name,quote_mail,quote_contents];
    var sql = "INSERT INTO quote (name,mail,quote_contents) VALUES(?,?,?)";

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
            res.send({
                code:1
            });
        })
    });


});

module.exports = router;