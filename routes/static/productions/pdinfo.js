var express = require('express');
var utility = require("../../../public/javascripts/utility");
var db_config = require("../../db/db_config");
var router = express.Router();

router.get('/', function(req, res, next) {

var allPdSpc = global.pdSpec;
var pid = req.query.pid;

const pdNavInfo = utility.pdMatch(pid);

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

if(allPdSpc){
    var specInfo = null;
    for(var i = 0; i < allPdSpc.length; i++){
        if(allPdSpc[i].id == pid){
            specInfo = allPdSpc[i];
            break;
        }
    }

    var pdInformation = specInfo.product_infomation;

    var pdDescription = specInfo.description;
    var pdFeature = specInfo.features;
    var pdSpe = specInfo.specifications ?  specInfo.specifications : '{}';

    pdFeature = utility.strToObj(pdFeature);
    pdSpe = utility.strToObj(pdSpe);

    var specifications_formated;
    var physical;
    var optional_modules;
    var selections;
    var order_Information;
    var specifications_table;

    specifications_formated = specInfo.specifications_format ? specInfo.specifications_format : '{}';
    specifications_formated = utility.strToObj(specifications_formated);

    physical = specInfo.physical ? specInfo.physical : '[]';
    physical = utility.strToObj(physical);

    optional_modules = specInfo.optional_modules ? specInfo.optional_modules : '';
    selections = specInfo.selections ? specInfo.selections : '';

    specifications_table = specInfo.specifications_table ? specInfo.specifications_table : '';


    order_Information = specInfo.ordc ? specInfo.ordc : '[]';
    order_Information = utility.strToObj(order_Information);

    res.render('productions/pdinfo',{pdGenerInfo:global.lvsubGpdLists3[pid - 1],
        pdInformation:pdInformation,
        pdDescription:pdDescription,
        pdFeature:pdFeature,
        pdSpe:pdSpe,
        //old

        specifications_formated:specifications_formated,
        physical:physical,
        optional_modules:optional_modules,
        selections:selections,
        order_Information:order_Information,
        specifications_table:specifications_table,


        //new added complex data, some in html
        gpdLists:global.gpdLists,
        subGpdLists:global.subGpdLists,
        lvsubGpdLists3:global.lvsubGpdLists3,
        loginInfo:loginInfo,
        isDisplayed:isDisplayed,
        pid:pid,
        action:action,
        //nav bar data
        pdNavInfo:pdNavInfo
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
            var pdSpe = specInfo[0].specifications ?  specInfo[0].specifications : '{}';
            pdFeature = utility.strToObj(pdFeature);
            pdSpe = utility.strToObj(pdSpe);


            var specifications_formated;
            var physical;
            var optional_modules;
            var selections;
            var order_Information;
            var specifications_table;

            specifications_formated = specInfo[0].specifications_format ? specInfo[0].specifications_format : '{}';
            specifications_formated = utility.strToObj(specifications_formated);


            physical = specInfo[0].physical ? specInfo[0].physical : '[]';
            physical = utility.strToObj(physical);

            optional_modules = specInfo[0].optional_modules ? specInfo[0].optional_modules : '';
            selections = specInfo[0].selections ? specInfo[0].selections : '';

            specifications_table = specInfo[0].specifications_table ? specInfo[0].specifications_table : '';

            order_Information = specInfo[0].ordc ? specInfo[0].ordc : '[]';
            order_Information = utility.strToObj(order_Information);

            res.render('productions/pdinfo',{pdGenerInfo:global.lvsubGpdLists3[pid - 1],
                pdInformation:pdInformation,
                pdDescription:pdDescription,
                pdFeature:pdFeature,
                pdSpe:pdSpe,
                //old

                specifications_formated:specifications_formated,
                physical:physical,
                optional_modules:optional_modules,
                selections:selections,
                order_Information:order_Information,
                specifications_table:specifications_table,


                //new added complex data, some in html
                gpdLists:global.gpdLists,
                subGpdLists:global.subGpdLists,
                lvsubGpdLists3:global.lvsubGpdLists3,
                loginInfo:loginInfo,
                isDisplayed:isDisplayed,
                pid:pid,
                action:action,
                //nav bar data
                pdNavInfo:pdNavInfo
            });
        })
    })
}

});

module.exports = router;