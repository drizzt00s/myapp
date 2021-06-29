var express = require('express');
var router = express.Router();
var utility = require("../../public/javascripts/utility");
var paypal = require("paypal-rest-sdk");

router.get('/', function(req, res, next) {

    var payerId = req.query.PayerID;
    var paymentId = req.query.paymentId;
                                           


    const execute_payment_json = {
            "payer_id" : payerId,
            "transactions": [{
            "amount": {
                "total": "30.11",
                "currency": "USD",
                "details": {
                  "subtotal": "30.00",
                  "tax": "0.07",
                  "shipping": "0.03",
                  "handling_fee": "1.00",
                  "shipping_discount": "-1.00",
                  "insurance": "0.01"
                }
              }
        }]
    };
   

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
       
        if (error) {
            console.log(error.response);
            throw error;
        } else {
           res.render("paymentSuccess");
        }
    });


 
});
module.exports = router;