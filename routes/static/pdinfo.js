var express = require('express');
var utility = require("../../public/javascripts/utility");
var db_config = require("../db/db_config");
var router = express.Router();

router.get('/', function(req, res, next) {
var pid = req.query.pid;
var gpdLists = global.gpdLists;//product_l1
var subGpdLists = global.subGpdLists;//product_l2
var lvsubGpdLists3 = global.lvsubGpdLists3;//product_l2


// var loginInfo = global.loginInfo;
// var isDisplayed = global.isDisplayed;
// if(!loginInfo){
//     loginInfo = "Sign in";
// }
// if(!isDisplayed){
//     isDisplayed = "show";
// }

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

if(!gpdLists || !subGpdLists || !lvsubGpdLists3){
    //如果global里没有产品信息
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
        connection.query("select * from product_l1",function(err, gpdLists_data){
            if(err){
                throw err;
            }
            connection.query("select * from product_l2",function(err, subGpdLists_data){
                if(err){
                    throw err;
                }
                gpdLists = gpdLists_data;
                subGpdLists = subGpdLists_data;
                connection.query("select * from product_l3 where id=" + pid,function (e, pdGenerInfo) {
                    if(e){
                        throw e;
                    }
                    connection.query("select * from product_specifications where id=" + pid,function (err, specInfo) {
                        if(e){
                            throw e;
                        }
                        connection.release();
                        var pdInformation = specInfo[0].product_infomation;
                        var pdDescription = specInfo[0].description;
                        var pdFeature = specInfo[0].features;
                        var pdSpe = specInfo[0].specifications;
                        pdFeature = utility.strToObj(pdFeature);
                        pdSpe = utility.strToObj(pdSpe);
                        res.render('pdinfo',{pdGenerInfo:pdGenerInfo[0],
                            pdInformation:pdInformation,
                            pdDescription:pdDescription,
                            pdFeature:pdFeature,
                            pdSpe:pdSpe,
                            gpdLists:gpdLists ? gpdLists :[],
                            subGpdLists:subGpdLists ? subGpdLists : [],
                            lvsubGpdLists3:lvsubGpdLists3 ? lvsubGpdLists3 :[],
                            loginInfo:loginInfo,
                            isDisplayed:isDisplayed,
                            pid:pid,
                            action:action

                        });
                    });
                });
            })
        })
    });
}else{

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
        connection.query("select * from product_specifications where id=" + pid,function (err, specInfo) {
            if(err){
                throw err;
            }
            connection.release();
            var pdInformation = specInfo[0].product_infomation;
            var pdDescription = specInfo[0].description;
            var pdFeature = specInfo[0].features;
            var pdSpe = specInfo[0].specifications;
            pdFeature = utility.strToObj(pdFeature);
            pdSpe = utility.strToObj(pdSpe);
            res.render('pdinfo',{pdGenerInfo:lvsubGpdLists3[pid - 1],
                pdInformation:pdInformation,
                pdDescription:pdDescription,
                pdFeature:pdFeature,
                pdSpe:pdSpe,
                gpdLists:gpdLists ? gpdLists :[],
                subGpdLists:subGpdLists ? subGpdLists : [],
                lvsubGpdLists3:lvsubGpdLists3 ? lvsubGpdLists3 :[],
                loginInfo:loginInfo,
                isDisplayed:isDisplayed,
                pid:pid,
                action:action
            });
        })
    })
}

});

module.exports = router;