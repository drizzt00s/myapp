var express = require('express');
var utility = require("../public/javascripts/utility");
var db_config = require("./db/db_config")
var router = express.Router();

router.get('/', function(req, res, next) {
var pid = req.query.pid;
var gpdLists = global.gpdLists;
var subGpdLists = global.subGpdLists;
var loginInfo = global.loginInfo;
var isDisplayed = global.isDisplayed;
if(!loginInfo){
    loginInfo = "Sign in";
}
if(!isDisplayed){
    isDisplayed = "show";
}
if(!gpdLists || !subGpdLists){
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
                            gpdLists:gpdLists,
                            subGpdLists:subGpdLists,
                            // lvsubGpdLists3:lvsubGpdLists3,
                            loginInfo:loginInfo,
                            isDisplayed:isDisplayed,
                            pid:pid
                        });
                    });
                });
            })
        })
    });
    // global.pool.query("select * from product_l1", function(err, gpdLists_data){
    //     if(err){
    //         throw err;
    //     }
    //     global.pool.query("select * from product_l2", function(err, subGpdLists_data){
    //         if(err){
    //             throw err;
    //         }
    //         gpdLists = gpdLists_data;
    //         subGpdLists = subGpdLists_data;
    //         global.pool.query("select * from product_l3 where id=" + pid, function(e, pdGenerInfo){
    //             if(e){
    //                 throw e;
    //             }
    //             global.pool.query("select * from product_specifications where id=" + pid, function(err, specInfo){
    //                 if(err){
    //                     throw err;
    //                 }
    //                 var pdInformation = specInfo[0].product_infomation;
    //                 var pdDescription = specInfo[0].description;
    //                 var pdFeature = specInfo[0].features;
    //                 var pdSpe = specInfo[0].specifications;
    //                 pdFeature = utility.strToObj(pdFeature);
    //                 pdSpe = utility.strToObj(pdSpe);
    //                 res.render('pdinfo',{pdGenerInfo:pdGenerInfo[0],
    //                     pdInformation:pdInformation,
    //                     pdDescription:pdDescription,
    //                     pdFeature:pdFeature,
    //                     pdSpe:pdSpe,
    //                     gpdLists:gpdLists,
    //                     subGpdLists:subGpdLists,
    //                     // lvsubGpdLists3:lvsubGpdLists3,
    //                     loginInfo:loginInfo,
    //                     isDisplayed:isDisplayed,
    //                     pid:pid
    //                 });
    //             });
    //         });
    //     });
    // });
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
        connection.query("select * from product_l3 where id=" + pid,function(err, pdGenerInfo){
            if(err){
                throw err;
            }
            connection.query("select * from product_specifications where id=" + pid,function(err, specInfo){
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
                res.render('pdinfo',{pdGenerInfo:pdGenerInfo[0],
                    pdInformation:pdInformation,
                    pdDescription:pdDescription,
                    pdFeature:pdFeature,
                    pdSpe:pdSpe,
                    gpdLists:gpdLists,
                    subGpdLists:subGpdLists,
                    // lvsubGpdLists3:lvsubGpdLists3,
                    loginInfo:loginInfo,
                    isDisplayed:isDisplayed,
                    pid:pid
                });
            })
        })
    });

    // global.pool.query("select * from product_l3 where id=" + pid, function(err, pdGenerInfo){
    //     if(err){
    //         throw err;
    //     }
    //     global.pool.query("select * from product_specifications where id=" + pid, function(err, specInfo){
    //         if(err){
    //             throw err;
    //         }
    //         var pdInformation = specInfo[0].product_infomation;
    //         var pdDescription = specInfo[0].description;
    //         var pdFeature = specInfo[0].features;
    //         var pdSpe = specInfo[0].specifications;
    //         pdFeature = utility.strToObj(pdFeature);
    //         pdSpe = utility.strToObj(pdSpe);
    //         res.render('pdinfo',{pdGenerInfo:pdGenerInfo[0],
    //             pdInformation:pdInformation,
    //             pdDescription:pdDescription,
    //             pdFeature:pdFeature,
    //             pdSpe:pdSpe,
    //             gpdLists:gpdLists,
    //             subGpdLists:subGpdLists,
    //             // lvsubGpdLists3:lvsubGpdLists3,
    //             loginInfo:loginInfo,
    //             isDisplayed:isDisplayed,
    //             pid:pid
    //         });
    //     });
    // });
}

});

module.exports = router;