var express = require('express');
var utility = require("../../public/javascripts/utility");
var db_config = require("../db/db_config");
var router = express.Router();

router.post("/", function(req, res, next){
    var pid = req.body.pid;
    var user = req.session.userData.account;
    var cart = req.session.cart;
    for(var i = 0; i <cart.pdList.length; i++ ){
        if(cart.pdList[i].id == pid){
            cart.pdList.splice(i, 1);
            break;
        }
    }
    var cartTotalVal = 0;
    for(var q = 0; q < cart.pdList.length; q++){
        cartTotalVal += parseInt(cart.pdList[q].totalPrice);
    }
    cart.cartPrice = cartTotalVal;
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
                code:1,
                data:"删除成功"
            });
        })
    });


    //
    // global.pool.query(sql,function(err, result){
    //     if(err){
    //         throw err;
    //     }
    //     req.session.cart = cart;
    //     res.send({
    //         code:1,
    //         data:"删除成功"
    //     });
    // });




});
module.exports = router;