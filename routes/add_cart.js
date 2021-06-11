var express = require('express');
var router = express.Router();
var db_config = require("./db/db_config");
var utility = require("../public/javascripts/utility");

router.post('/', function(req, res, next) {
    if(!req.session.userData || !req.session.cart){
        res.send({
            code:0,
            data:"请登录或注册"
        });
    }else{
        var cart = req.session.cart;
        var pid = req.body.pid;//产品id
        var qty = req.body.qty;//数量
        var user = req.session.userData.account;
        var sql = "SELECT * From product_l3 WHERE id" + "=?";
        var sqlValue = [pid];


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
            connection.query(sql,sqlValue,function(err, result){
                if(err){
                    throw err;
                }
                if(cart.pdList.length <= 0){
                    //购物车没东西
                    var item = {};
                    item.id = pid;
                    item.pdInfo = result[0];
                    item.qty = parseInt(qty);
                    item.totalPrice = parseInt((result[0].price)) * parseInt(qty);
                    cart.pdList.push(item);
                } else{
                    var isUpdate = false;
                    var index;
                    for(var i = 0; i < cart.pdList.length; i++){
                        if(cart.pdList[i].pdInfo.id == pid){
                            isUpdate = true;
                            index = i;
                        }
                    }
                    if(!isUpdate){
                        //插入
                        var item = {};
                        item.id = pid;
                        item.pdInfo = result[0];
                        item.qty = parseInt(qty);
                        item.totalPrice = parseInt((result[0].price)) * parseInt(qty);
                        cart.pdList.push(item);
                    }else{
                        //更新
                        cart.pdList[index].qty = parseInt((cart.pdList[index].qty)) + parseInt(qty);
                        cart.pdList[index].totalPrice = (cart.pdList[index].totalPrice) + parseInt(result[0].price) * parseInt(qty);
                    }
                }
                var pdlists = cart.pdList;
                var cartTotalVal = 0;
                for(var q = 0; q < pdlists.length; q++){
                    cartTotalVal += parseInt(pdlists[q].totalPrice);
                }
                cart.cartPrice = cartTotalVal;
                var dbCart = JSON.stringify(cart);
                var sql = "UPDATE cart SET carts=" +"'" + dbCart +"'" +"WHERE mail="+"'" + user +"'";
                connection.query(sql,sqlValue,function(err, result){
                    if(err){
                        throw err;
                    }
                    connection.release();
                    req.session.cart = cart;
                    res.send({
                        code:1,
                        data:"产品已添加至购物车"
                    });
                });
            })
        });
    }
});

module.exports = router;