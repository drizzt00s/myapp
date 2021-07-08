var express = require('express');
var router = express.Router();
var utility = require("../../public/javascripts/utility");
var paypal = require("paypal-rest-sdk");
var pmt = require("../../payment/pmt");

router.get('/', function(req, res, next) {

    var userData = req.session.userData;
    if(!userData){
        var loginInfo = "Sign in";
        var isDisplayed = "show";
        var action = "/login";
    }else{
        var loginInfo = userData.account;
        var isDisplayed = "hide";
        var action = "/my_dashboard";
    }

    var order_information = req.session.order_information;


  
    var order_tel = order_information.shippingAddress.entry_telephone;
    var order_username = order_information.shippingAddress.shippingAdd_name;
    var order_shipping_address = order_information.shippingAddress.shippingAdd_entry_street_address + " " +
                                 order_information.shippingAddress.shippingAdd_entry_city + " " +
                                 order_information.shippingAddress.shippingAdd_entry_state + " " +
                                 order_information.shippingAddress.shippingAdd_country_code;
    var order_postcode = order_information.shippingAddress.shippingAdd_entry_postcode; 
    

    var order_billing_address = order_information.billingAddress.billingAdd_entry_street_address + " " +
    order_information.billingAddress.billingAdd_entry_city + " " +
    order_information.billingAddress.billingAdd_entry_state + " " +
    order_information.billingAddress.billingAdd_country_code;

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
                var shipping_address = JSON.stringify(order_information.shippingAddress);
                var billing_address = JSON.stringify(order_information.billingAddress);


                var sqlValue = [orderNo,
                    mail,
                    orderSubtotal,
                    paymentMethod,
                    orderTime,
                    orderStatus,
                    orderCarts,
                    shipping_address,
                    billing_address
                ];
                    // var sql = "INSERT INTO order_detail (mail,sub_total,payment_method,transaction_time,order_status,carts) VALUES(?,?,?,?,?,?)";

                    var sql = `INSERT INTO order_detail (order_number,
                                            mail,
                                            sub_total,
                                            payment_method,
                                            transaction_time,
                                            order_status,
                                            carts,
                                            shipping_address,
                                            billing_address                                       
                                            ) 
                                            VALUES(?,?,?,?,?,?,?,?,?)`
                    connection.query(sql,sqlValue,function(err, result){
                        if(err){
                            throw err;
                        }
                        //delete checkouted product in session
                        req.session.cart =  pmt.checkout_update_cart_session(req.session.checkoutCartSession, req.session.cart);
                        //update cart db
                        var newDbCart = req.session.cart;
                        newDbCart = JSON.stringify(newDbCart);
                        var sql = "UPDATE cart SET carts=" +"'" + newDbCart +"'" +"WHERE mail="+"'" + mail +"'";
                        connection.query(sql,sqlValue,function(err, result){
                            if(err){
                                throw err;
                            }

                            
                            // var display_session_carts = req.session.checkoutCartSession;
                            // req.session.checkoutCartSession = null;
                            //输出req.session.checkoutCartSession后,将其删除 ??
                            //是否将 req.session.order_information删除??


                            // 目前订单成功页面只显示 shipping address
                            // 如果billing address没有 那billing address就等于 shipping address


                            connection.release();
                            res.render("paymentSuccess",{
                                gpdLists:global.gpdLists,
                                subGpdLists:global.subGpdLists,
                                lvsubGpdLists3:global.lvsubGpdLists3,
                                loginInfo:loginInfo,
                                isDisplayed:isDisplayed,
                                action:action,

                                orderNo:orderNo,
                                orderTime:orderTime,
                                mail:mail,
                                orderSubtotal:orderSubtotal,
                                paymentMethod:paymentMethod,
                                orderStatus:orderStatus,
                                //来自req.session.checkoutCartSession

                                order_tel:order_tel,
                                order_username:order_username,
                                order_shipping_address:order_shipping_address,
                                order_billing_address:order_billing_address,
                                order_postcode:order_postcode
                                 //来自req.session.order_information

                            });

                        })                                   
                    })
             

            });
        }
    });


 
});
module.exports = router;