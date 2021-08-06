var express = require('express');
var utility = require("../../public/javascripts/utility");
var db_config = require("../db/db_config");
var router = express.Router();

router.get('/', function(req, res, next) {
    const supCatId = req.query.supCatId;
    var userData = req.session.userData;
    if(!userData){
        var loginInfo = "Sign in";
        var isDisplayed = "show";
        var action = "/login";
    }else{
        var loginInfo = userData.account;
        var isDisplayed = "hide";
        var action = "/my_dashboard";
    }


    res.render('supProduct',{
        gpdLists:global.gpdLists,
        subGpdLists:global.subGpdLists,
        lvsubGpdLists3:global.lvsubGpdLists3,
        loginInfo:loginInfo,
        isDisplayed:isDisplayed,
        action:action,
        lvsubGpdLists3_abbr:global.lvsubGpdLists3_abbr,
        supCatId:supCatId

    });

    // var sbpId = req.query.id;
    // var pool = global.pool ? global.pool :utility.createConnectionPool(
    //     db_config.host,
    //     db_config.username,
    //     db_config.password,
    //     db_config.port,
    //     db_config.database,db_config.pool);
    // pool.getConnection(function(err,connection){
    //     if(err){
    //         throw err;
    //     }
    //     connection.query("select * from product_l3 where parentID=" + sbpId,function(err, d){
    //         if(err){
    //             throw err;
    //         }
    //         connection.release();
    //         res.render('subProduct', { title: 'Express',data:d});
    //     })
    // });




});

module.exports = router;