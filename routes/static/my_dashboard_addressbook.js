var express = require('express');
var router = express.Router();
var utility = require("../../public/javascripts/utility");
var db_config = require("../db/db_config");

router.get('/', function(req, res, next) {
    var userData = req.session.userData;
    if(!userData){
        res.redirect("/login")
    }else{
        var loginInfo = userData.account; //mail
        var isDisplayed = "hide";
        var action = "/my_dashboard";
    }

    var pool = global.pool ? global.pool :utility.createConnectionPool(
        db_config.host,
        db_config.username,
        db_config.password,
        db_config.port,
        db_config.database,db_config.pool);
    var sql = "SELECT * FROM shipping_address WHERE mail = " + "'" + loginInfo + "'";

    pool.getConnection(function(err,connection){
        if(err){
            throw err;
        }
        connection.query(sql,function(err, result){
            if(err){
                throw err;
            }
            var sql_billing = "SELECT * FROM billing_address WHERE mail = " + "'" + loginInfo + "'";
            connection.query(sql_billing,function(err, result_billing) {
                if (err) {
                    throw err;
                }
                connection.release();
                res.render("my_dashboard_addressbook",{
                    loginInfo:loginInfo,
                    isDisplayed:isDisplayed,
                    action:action,
                    shipping_address:result,
                    billing_address:result_billing,
                    gpdLists:global.gpdLists,
                    subGpdLists:global.subGpdLists,
                    lvsubGpdLists3:global.lvsubGpdLists3,
                });
            })
        })
    });


});

module.exports = router;