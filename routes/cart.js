var express = require("express");
var router = express.Router();
router.get('/', function(req, res, next) {
    var cart = req.session.cart ? req.session.cart : [];
    res.render("cart",{cart:cart.pdList,cartPrice:cart.cartPrice});
});

module.exports = router;