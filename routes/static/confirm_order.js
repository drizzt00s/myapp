var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    console.log(JSON.stringify(req.session.checkoutCartSession));

    if(!req.session.checkoutCartSession){
        res.redirect("/cart");
    }
    var totalVal = req.session.checkoutCartSession.cartPrice;

    res.render("confirm_order",{totalVal:totalVal,pdList:req.session.checkoutCartSession.pdList});
    // res.render("confirm_order");
});

module.exports = router;