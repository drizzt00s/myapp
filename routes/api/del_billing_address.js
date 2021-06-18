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
    // var address_type = req.body.address_type;
    // address_type is not used. this api is only to delete billing address.
    // currently this change needs to be done in ./del_shipping_address, it still uses address_type, which has no usage.

    var sql = "DELETE FROM billing_address" + " WHERE id="  +"'" + addressId +"'" + " AND mail="+"'" + mail +"'";
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