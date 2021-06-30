var express = require('express');
var router = express.Router();
var utility = require("../../public/javascripts/utility");
var paypal = require("paypal-rest-sdk");

router.get('/', function(req, res, next) {

    var payerId = req.query.PayerID;
    var paymentId = req.query.paymentId;
    var amount = req.session.create_payment_json.transactions[0].amount;
    var transactions = [{
        "amount":null
    }];
   transactions[0]["amount"] = amount;


    const execute_payment_json = {
            "payer_id" : payerId,
            "transactions":transactions
        //     "transactions": [{
        //         "amount": {
        //             "total": "30.00",
        //             "currency": "USD",
        //             "details": {
        //               "subtotal": "30.00",
        //               "tax": "0.00",
        //               "shipping": "0.00",
        //               "handling_fee": "0.00",
        //               "shipping_discount": "0.00",
        //               "insurance": "0.00"
        //             }
        //           }
        // }]
    };
   

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
       
        if (error) {
            console.log(error.response.details);
            // throw error;
        } else {
            //支付成功生成1. 订单编号
            //2.支付成功时间
                //2.支付成功时间
                //3.用户id (mail)
                //4.支付方式 (paypal)
                //5.订单subtotal 除了商品总价 不包含其他任何费用
                //6.订单状态 completed
                //7.订单详情 sesssion中req.session.checkoutCartSession 要将req.session.checkoutCartSession
                //从用户req.session.cart 中移除,并将req.session.cart 更新到cart表

            // console.log(JSON.stringify(payment));
            // return false;

            var orderNo = utility.createOrderNo(12);
            // var orderNo = "1233433";
            var orderTime = utility.getServerTime('Y-m-d H:i:s');
            var mail = req.session.userData.account;
            var orderSubtotal = req.session.checkoutCartSession.cartPrice;
            //除了商品价格不含其他任何费用
            var paymentMethod = 'paypal';
            var orderStatus = 'completed';
            var orderCarts = req.session.checkoutCartSession;
            orderCarts = JSON.stringify(orderCarts);
      

            //订单详细内容
            var expected_delivery = '';
            //不知道如何计算这个逻辑 先不进数据库

            var sqlValue = [orderNo];
            var sql = "INSERT INTO order_number (order_no) VALUES(?)";

            //订单数据存数据库
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
                    var sqlValue = [mail,orderSubtotal,paymentMethod,orderTime,orderStatus,orderCarts];
                    var sql = "INSERT INTO order_detail (mail,sub_total,payment_method,transaction_time,order_status,carts) VALUES(?,?,?,?,?,?)";
                    connection.query(sql,sqlValue,function(err, result){
                        if(err){
                            throw err;
                        }
                        connection.release();
                        res.render("paymentSuccess");
                    })
             
                })
            });


        




        }
    });


 
});
module.exports = router;