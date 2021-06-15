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
    var checkedoutPd = [];
    for(var i = 0; i < req.session.cart.pdList.length; i++ ){
        for(var q = 0; q < pid.length; q++){
            if(req.session.cart.pdList[i].id == pid[q]){
                checkedoutPd.push(req.session.cart.pdList[i]);
            }
        }
    }
    console.log(checkedoutPd)









});

module.exports = router;