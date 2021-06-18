var express = require('express');
var utility = require("../../public/javascripts/utility");
var db_config = require("../db/db_config");
var router = express.Router();

router.get('/', function(req, res, next){
    console.log(JSON.stringify(req.session.checkoutCartSession));
    if(!req.session.userData){
        res.redirect("/login");
    }
    if(!req.session.checkoutCartSession){
        res.redirect("/cart");
    }

    var mail = req.session.userData.account;
    var totalVal = req.session.checkoutCartSession.cartPrice;
    var pool = global.pool ? global.pool :utility.createConnectionPool(
        db_config.host,
        db_config.username,
        db_config.password,
        db_config.port,
        db_config.database,db_config.pool);

    var sql_shipping_add = "SELECT * FROM shipping_address WHERE mail = " + "'" + mail + "'";
    var sql_billing_add = "SELECT * FROM billing_address WHERE mail = " + "'" + mail + "'";

    pool.getConnection(function(err,connection) {
        if (err) {
            throw err;
        }
        connection.query(sql_shipping_add,function(err, shipping_addr_res){
            if(err){
                throw err;
            }
            connection.query(sql_billing_add,function(err, billing_addr_res){
                if(err){
                    throw err;
                }
                console.log(billing_addr_res);

                connection.release();
                res.render("confirm_order",{
                        totalVal:totalVal,
                        pdList:req.session.checkoutCartSession.pdList,
                        shipping_addr_res:shipping_addr_res,
                        billing_addr_res:billing_addr_res
                });
            })
        })
    });




});

module.exports = router;