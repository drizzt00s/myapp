var express = require("express");
var router = express.Router();
router.get('/', function(req, res, next) {
    console.log(req.session.cart);
    var cart = req.session.cart;
    res.render("cart",{cart:cart.pdList,cartPrice:cart.cartPrice});
});

module.exports = router;