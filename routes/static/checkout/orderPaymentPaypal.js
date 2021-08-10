var express = require('express');
var router = express.Router();
var utility = require("../../../public/javascripts/utility");

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

    if(!req.session.userData){
        res.redirect("/login");
    }
    if(!req.session.checkoutCartSession){
        res.redirect("/cart");
    }
    // console.log(req.session.order_information);
    console.log(req.session.checkoutCartSession);


    var now = utility.getServerTime('Y-m-d H:i:s');
 
    res.render('checkout/orderPaymentPaypal',{
        loginInfo:loginInfo,
        isDisplayed:isDisplayed,
        action:action,
        gpdLists:global.gpdLists,
        subGpdLists:global.subGpdLists,
        lvsubGpdLists3:global.lvsubGpdLists3,
        order_information:req.session.order_information,
        checkoutCartSession:req.session.checkoutCartSession,
        orderTime:now
    
    });
});
module.exports = router;