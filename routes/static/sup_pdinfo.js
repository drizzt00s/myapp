var express = require('express');
var utility = require("../../public/javascripts/utility");
var db_config = require("../db/db_config");
var router = express.Router();

router.get('/', function(req, res, next) {
    require("dotenv").config();
    let host = process.env.HOST;

    const supCatId = req.query.supCatId;
    const pdNavInfo = utility.supCatMatch(supCatId);

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
        supCatId:supCatId,
        host:host,
        pdNavInfo:pdNavInfo

    });

});

module.exports = router;