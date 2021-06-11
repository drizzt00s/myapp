var express = require('express');
var utility = require("../public/javascripts/utility");
var db_config = require("./db/db_config");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
var userData = req.session.userData;

if(!userData){
    var loginInfo = "Sign in";
    var isDisplayed = "show";
}else{
    var loginInfo = userData.account;
    var isDisplayed = "hide";
}
console.log(loginInfo)
if(!global.gpdLists || !global.subGpdLists  || !global.lvsubGpdLists3){
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
        connection.query("select * from product_l1",function(err, gpdLists){
            if(err){
                throw err;
            }
            connection.query("select * from product_l2",function(err, subGpdLists){
                if(err){
                    throw err;
                }
                connection.query("select * from product_l3",function(err, d){
                    if(err){
                        throw err;
                    }
                    global.gpdLists = gpdLists;//product_l1
                    global.subGpdLists = subGpdLists;//product_l2
                    global.lvsubGpdLists3 = d;//product_l3
                    global.loginInfo = loginInfo;
                    global.isDisplayed = isDisplayed;
                    console.log("from db !!!!!!!!!!!");
                    res.render('index', {title:'Express',gpdLists:gpdLists,subGpdLists:subGpdLists,lvsubGpdLists3:d,loginInfo:loginInfo,isDisplayed:isDisplayed});
                });
            });
        });
    });
}else{
    console.log("from global !!!!!!!!!!!");
    res.render('index', {title:'Express',gpdLists:global.gpdLists,subGpdLists:global.subGpdLists,lvsubGpdLists3:global.lvsubGpdLists3,loginInfo:loginInfo,isDisplayed:isDisplayed});
}

});

module.exports = router;
