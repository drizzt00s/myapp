var express = require('express');
var utility = require("../public/javascripts/utility");
// var cart = require("../mogo/model/cart");
var router = express.Router();

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
        var connection = utility.createConnection("localhost", "root", "YES", "3306", "app");
        utility.connect(connection);
        var sql = "SELECT * From product_l3 WHERE id" + "=?";
        var sqlValue = [pid];
        connection.query(sql,sqlValue,function(err, result){
            if (err){
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
            var connection = utility.createConnection("localhost", "root", "YES", "3306", "app");
            utility.connect(connection);
            connection.query(sql,function(err, result){
                if(err){
                    throw err;
                }
                connection.end();
                req.session.cart = cart;
                res.send({
                    code:1,
                    data:"产品已添加至购物车"
                });
            })
        })
    }
});

module.exports = router;