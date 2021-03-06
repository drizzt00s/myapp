var express = require('express');
var utility = require("../../public/javascripts/utility");
var db_config = require("../db/db_config");
var router = express.Router();

router.post('/', function(req, res, next) {

    // var mail = req.session.userData.account;
    var orderID = req.body.orderid;

    var sql = "SELECT * From order_detail WHERE order_number" + "=?";
    var sqlValue = [orderID];

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
            })
        })
    });





});

module.exports = router;