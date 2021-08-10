var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var userData = req.session.userData;

    if(!userData){
        res.redirect("/login")
    }else{
        var loginInfo = userData.account;
        var isDisplayed = "hide";
        var action = "/my_dashboard";
    }

    var orderId = req.query.orderid;

    res.render("checkout/order_history_details",{
        loginInfo:loginInfo,
        isDisplayed:isDisplayed,
        action:action,
        gpdLists:global.gpdLists,
        subGpdLists:global.subGpdLists,
        lvsubGpdLists3:global.lvsubGpdLists3,
        orderId:orderId
    });
});
module.exports = router;