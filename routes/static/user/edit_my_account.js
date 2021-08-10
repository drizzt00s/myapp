var express = require('express');
var router = express.Router();
var db_config = require("../../db/db_config");

router.get('/', function(req, res, next) {
    var userData = req.session.userData;

    if(!userData){
        // var loginInfo = "Sign in";
        // var isDisplayed = "show";
        // var action = "/login";
        res.redirect("/login")
    }else{
        var loginInfo = userData.account;
        var isDisplayed = "hide";
        var action = "/my_dashboard";
    }
    var mail = req.session.userData.account;
    var sql = "SELECT firstName,lastName FROM user WHERE email=" + "'" + mail + "'";
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
        connection.query(sql,function(err, result){
            if(err){
                throw err;
            }
            connection.release();
            var name = result[0].lastName + " " + result[0].firstName;
            res.render("user/editMyAccount",{
                loginInfo:loginInfo,
                isDisplayed:isDisplayed,
                action:action,
                gpdLists:global.gpdLists,
                subGpdLists:global.subGpdLists,
                lvsubGpdLists3:global.lvsubGpdLists3,
                mail:mail,
                name:name,
                firstname:result[0].firstName,
                lastname:result[0].lastName
            });
        })
    });





});

module.exports = router;