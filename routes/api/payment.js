var express = require('express');
var utility = require("../../public/javascripts/utility");
var db_config = require("../db/db_config");
var paypal = require("paypal-rest-sdk");

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AXwwkd_EJrg8HfjSx6JNYITztaOUV3cn7Ul3E5iQjH4CzBOz-mPargwQLCsXe-yWGhzyQSGvbuszKi6t',
    'client_secret': 'ENpP-zbtu78LI4ajEufgchZnaEE1v2Dk3afV4UMzEQKTouiQX5KTMpTkuSRVY46GIvxIecU05UsLUk9x'
  });


var router = express.Router();

// const STRIPE_SCRETE_KEY_PUBLIC = 'pk_test_51J1mHODb1P0OO0sk7q7kwmaSuJ69O8zQ47LdLfL5wH38c4tyBe4zbEWVd3ErBj0Bu1oOFSrPno0IUHmgBkV6S4ni00zWrDNEdw';
// const STRIPE_SCRETE_KEY = 'sk_test_51J1mHODb1P0OO0sk2VmdaUMAqJZrjYPPIUTfVmDhbVmqyuCmEKptYysIS2xGkStfLZrkwvsyhIiaPK8VayY0Nq5f00HzkvWSnK';
// var stripe = require("stripe")(STRIPE_SCRETE_KEY);
//stripe is now cannot be used in china mainland


router.post('/', function(req, res, next) {



    const create_payment_json = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "transactions": [
      {
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
        },
        "description": "The payment transaction description.",
        "custom": "EBAY_EMS_90048630024435",
        "invoice_number": "28787589673",
        "payment_options": {
          "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
        },
        "soft_descriptor": "ECHI5786786",
        "item_list": {
          "items": [
            {
              "name": "hat",
              "description": "Brown hat.",
              "quantity": "5",
              "price": "3",
              "tax": "0.01",
              "sku": "1",
              "currency": "USD"
            },
            {
              "name": "handbag",
              "description": "Black handbag.",
              "quantity": "1",
              "price": "15",
              "tax": "0.02",
              "sku": "product34",
              "currency": "USD"
            }
          ],
          "shipping_address": {
            "recipient_name": "Brian Robinson",
            "line1": "4th Floor",
            "line2": "Unit #34",
            "city": "San Jose",
            "country_code": "US",
            "postal_code": "95131",
            "phone": "011862212345678",
            "state": "CA"
          }
        }
      }
    ],
    "note_to_payer": "Contact us for any questions on your order.",
    "redirect_urls": {
      "return_url": "http://localhost:3000/paymentSuccess",
      "cancel_url": "http://localhost:3000/paymentCancel"
    }

};





    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
        
          for(let i = 0; i < payment.links.length; i++){
            if(payment.links[i].rel.indexOf('approval_url') != -1 ){
                res.redirect(payment.links[i].href);
                
            }
          }
    

        }
    });


    // var pid = req.body.pid;
    // var sql = "SELECT * FROM ques WHERE pid" + "=?";
    // var sqlValue = [pid];

    // var pool = global.pool ? global.pool :utility.createConnectionPool(
    //     db_config.host,
    //     db_config.username,
    //     db_config.password,
    //     db_config.port,
    //     db_config.database,db_config.pool);

    // pool.getConnection(function(err,connection){
    //     if(err){
    //         throw err;
    //     }
    //     connection.query(sql,sqlValue,function(err, result){
    //         if(err){
    //             throw err;
    //         }
    //         connection.release();
    //         res.send({
    //             code:1,
    //             data:result
    //         });
    //     })
    // });



});
module.exports = router;