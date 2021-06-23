var express = require('express');
var utility = require("../../public/javascripts/utility");
var db_config = require("../db/db_config");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
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


res.render('index', {gpdLists:global.gpdLists,
            subGpdLists:global.subGpdLists,
            lvsubGpdLists3:global.lvsubGpdLists3,
            loginInfo:loginInfo,
            isDisplayed:isDisplayed,
            action:action,
            lvsubGpdLists3_abbr:global.lvsubGpdLists3_abbr
    });
});

module.exports = router;
