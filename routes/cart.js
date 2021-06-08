var express = require("express");
var router = express.Router();
router.get('/', function(req, res, next) {
    if(!req.session.userData || !req.session.cart){
        res.redirect("/login");
    }else {
        var cart = req.session.cart;
        res.render("cart",{cart:cart.pdList,cartPrice:cart.cartPrice});
    }
});

module.exports = router;