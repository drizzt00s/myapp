var express = require('express');
var router = express.Router();
var db_config = require("../../db/db_config");


router.get('/', function(req, res, next) {
    var userData = req.session.userData;

    if(!userData){
        res.redirect("/login")
    }else{
        var loginInfo = userData.account;
        var isDisplayed = "hide";
        var action = "/my_dashboard";
    }
    var email = req.session.userData.account;

    var sql = "SELECT quote_number From quote WHERE acct_mail" + "=?";
    var sqlValue = [email];

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
            res.render("user/quote_history",{
                loginInfo:loginInfo,
                isDisplayed:isDisplayed,
                action:action,
                gpdLists:global.gpdLists,
                subGpdLists:global.subGpdLists,
                lvsubGpdLists3:global.lvsubGpdLists3,
                quote_history:result
            });
        })
    });




});
module.exports = router;