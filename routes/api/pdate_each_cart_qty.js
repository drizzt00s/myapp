var express = require('express');
var router = express.Router();
var utility = require("../../public/javascripts/utility");
var db_config = require("../db/db_config");

router.post("/", function(req, res, next){
    var user = req.session.userData.account;
    
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

    
    var dbCart = JSON.stringify(cart);
    var sql = "UPDATE cart SET carts=" +"'" + dbCart +"'" +"WHERE mail="+"'" + user +"'";



    var pool = global.pool ? global.pool :utility.createConnectionPool(
        db_config.host,
        db_config.username,
        db_config.password,
        db_config.port,
        db_config.database,db_config.pool);

    pool.getConnection(function(err,connection){
        if(err){
            throw err;
        }
        connection.query(sql,function(err, result){
            if(err){
                throw err;
            }
            connection.release();
            req.session.cart = cart;
            res.send({
                code:1
            });
        })
    });



});
module.exports = router;