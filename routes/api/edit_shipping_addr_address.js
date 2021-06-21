var express = require('express');
var utility = require("../../public/javascripts/utility");
var db_config = require("../db/db_config");
var router = express.Router();

router.post("/", function(req, res, next){
    if(!req.session.userData){
        throw new Error("user session data doesn't exit");
    }
    var mail = req.session.userData.account;
    var edit_data = req.body.edit_data;
    var edit_addr_type = edit_data.edit_addr_type// edit shipping address or billing address
    if(edit_addr_type == 1){
        var table = "shipping_address";
    }else if(edit_addr_type == 2){
        var table = "billing_address";
    }
    var sql = "UPDATE " + table + " SET entry_firstname=" +"'" + edit_data.entry_firstname +"'"+ ","+
        " entry_lastname="+"'" + edit_data.entry_lastname +"'"+","+
        " entry_telephone="+"'" + edit_data.entry_telephone +"'"+","+
        " entry_street_address="+"'" + edit_data.street_address +"'"+","+
        " entry_postcode="+"'" + edit_data.postcode +"'"+
        " WHERE mail="+"'" + mail +"'"+
        " AND id="+"'" + edit_data.shpping_addr_id+"'";

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