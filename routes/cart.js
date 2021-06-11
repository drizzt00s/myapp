var express = require("express");
var router = express.Router();
router.get('/', function(req, res, next) {

    var userData = req.session.userData;
    if(!userData){
        var loginInfo = "Sign in";
        var isDisplayed = "show";
    }else{
        var loginInfo = userData.account;
        var isDisplayed = "hide";
    }


    if(!req.session.userData || !req.session.cart){
        res.redirect("/login");
    }else {
        var cart = req.session.cart;
        res.render("cart",{cart:cart.pdList,cartPrice:cart.cartPrice,loginInfo:loginInfo,isDisplayed:isDisplayed});
    }
});
module.exports = router;