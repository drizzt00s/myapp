var express = require('express');
var router = express.Router();

router.post("/", function(req, res, next){
    var updatedQty = req.body.updatedQty;
    var pid = req.body.pid;
    var cart = req.session.cart;
    var pdList = cart.pdList;
    var newCartTotalVal = 0;
    for(var i = 0; i <pdList.length; i++){
        if(pdList[i].id == pid){
            pdList[i].qty =updatedQty;
            pdPrice = pdList[i].pdInfo.price;//单价
            pdList[i].totalPrice = (pdList[i].qty) * pdPrice;
        }
    }
    for(var q = 0; q < cart.pdList.length; q++){
        newCartTotalVal += parseInt(cart.pdList[q].totalPrice);
    }
    cart.cartPrice = newCartTotalVal;
    req.session.cart = cart;
    res.send({
        code:1
    });

});
module.exports = router;