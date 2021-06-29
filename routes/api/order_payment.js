var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {

    var order_information = req.body.order_information;
    req.session.order_information = order_information;
    res.send({
        code:1
    });
    // console.log(req.session.cart);
    // console.log(req.session.checkoutCartSession);
    
});

module.exports = router;