var express = require('express');
var utility = require("../../public/javascripts/utility");
var db_config = require("../db/db_config");
var router = express.Router();

router.post("/", function(req, res, next){
    if(!req.session.userData){
        throw new Error("user session data doesn't exit");
    }
    var mail = req.session.userData.account;
    var addressId = req.body.addressId;
    var address_type = req.body.address_type;
    if(address_type == 1){
        //shipping address
        var table = "shipping_address";
    }else if(address_type == 2){
        //billing address
        var table = "billing_address";
    }
    var sql ="UPDATE " + table + " SET is_default= CASE WHEN id=" +"'" + addressId +"'" + "THEN 1 ELSE 0 END WHERE mail=" + "'" + mail +"'";
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
        connection.query(sql,function(err, data){
            if(err){
                throw err;
            }
            connection.release();
            res.send({code:1});
        })
    });




});

module.exports = router;