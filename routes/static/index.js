var express = require('express');
const ip = require("ip");

var router = express.Router();

router.get('/', function(req, res, next) {
require("dotenv").config();
let host = process.env.HOST;
console.log("--------------",   ip.address());
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
            lvsubGpdLists3_abbr:global.lvsubGpdLists3_abbr,
            host:host
    });
});

module.exports = router;
