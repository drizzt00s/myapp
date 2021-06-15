var express = require('express');
var utility = require("../public/javascripts/utility");
var db_config = require("./db/db_config");
var router = express.Router();

router.post('/', function(req, res, next) {
    var pid = req.body.pid;
    if(pid.length <= 0){
        throw new Error("no product checked out.");
    }
    if(req.session.cart.pdList <= 0){
        throw new Error("no cart session.");
    }
    var checkoutCartSession = {
        pdList:[],
        cartPrice:0
    };


    var checkedoutPdList = [];
    for(var i = 0; i < req.session.cart.pdList.length; i++ ){
        for(var q = 0; q < pid.length; q++){
            if(req.session.cart.pdList[i].id == pid[q]){
                checkedoutPdList.push(req.session.cart.pdList[i]);
            }
        }
    }
    // console.log(req.session.cart)
    // console.log(checkedoutPdList)

    checkoutCartSession.pdList = checkedoutPdList;
    for(var q = 0; q < checkoutCartSession.pdList.length; q++){
        checkoutCartSession.cartPrice += (checkoutCartSession.pdList[q]).totalPrice;
    }
    req.session.checkoutCartSession = checkoutCartSession;
    // console.log(checkoutCartSession)
    res.send({
        code:1
    });
});

module.exports = router;