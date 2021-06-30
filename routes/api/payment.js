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

router.post('/', function(req, res, next) {

  var create_payment_json_basic = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "note_to_payer": "Contact us for any questions on your order.",
    "redirect_urls": {
      "return_url": "http://localhost:3000/paymentSuccess",
      "cancel_url": "http://localhost:3000/paymentCancel"
    }
  };

    // console.log(req.session.cart);
    // console.log(req.session.checkoutCartSession);
  function constructPaypalObj(basicObj){
    var transactions = [{}];
    transactions[0].description = "The payment transaction description.";
    transactions[0].payment_options =  {
      "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
    };
    transactions[0].invoice_number = utility.createInvoiceNumber(11);

    var item_list = {};
    var items = [];
    for(var i = 0; i < req.session.checkoutCartSession.pdList.length; i++ ){
      items.push(req.session.checkoutCartSession.pdList[i]);
    }
    item_list.items = items;
    //for now, leave item_list.shipping_address

    transactions[0].item_list = item_list;

    var checkoutTotal = req.session.checkoutCartSession.cartPrice
    checkoutTotal = checkoutTotal + '';
    
    // checkoutTotal 只是商品总价 不包含其他一切费用

    var amount = {
      "total": "",
      "currency": "USD",
      "details": {
        "subtotal": "",
        "tax": "0.00",
        "shipping": "0.00",
        "handling_fee": "0.00",
        "shipping_discount": "0.00",
        "insurance": "0.00"
      }
    };
    amount.total = checkoutTotal;
    amount.details.subtotal = checkoutTotal;
    transactions[0].amount = amount;
    basicObj.transactions = transactions;

    var newItems = [];
    for(var i = 0; i < basicObj.transactions[0]["item_list"]["items"].length; i++){
      var newItem = {};
      newItem.name = basicObj.transactions[0]["item_list"]["items"][i]["pdInfo"]["des"];
      newItem.description = newItem.name;
      newItem.quantity = basicObj.transactions[0]["item_list"]["items"][i]["qty"];
      newItem.price = basicObj.transactions[0]["item_list"]["items"][i]["pdInfo"]["price"];
      newItem.tax = "0.00";
      newItem.sku = "1";
      newItem.currency = "USD";
      newItems.push(newItem);
    }

    basicObj.transactions[0]["item_list"]["items"] = newItems;
    return basicObj;
  }

  var create_payment_json = constructPaypalObj(create_payment_json_basic);
  req.session.create_payment_json = create_payment_json;
  


//   var  create_payment_json = {
//     "intent": "sale", 
//     "payer": {
//         "payment_method": "paypal"
//     }, 
//     "note_to_payer": "Contact us for any questions on your order.", 
//     "redirect_urls": {
//         "return_url": "http://localhost:3000/paymentSuccess", 
//         "cancel_url": "http://localhost:3000/paymentCancel"
//     }, 
//     "transactions": [
//         {
//             "description": "The payment transaction description.", 
//             "payment_options": {
//                 "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
//             }, 
//             "invoice_number": 90121455350, 
//             "item_list": {
//                 "items": [
//                   {
//                     "name": "hat",
//                     "description": "Brown hat.",
//                     "quantity": "4",
//                     "price": "1",
//                     "tax": "0.00",
//                     "sku": "1",
//                     "currency": "USD"
//                   }
//                 ],
//                 "shipping_address": {
//                     "recipient_name": "Brian Robinson", 
//                     "line1": "4th Floor", 
//                     "line2": "Unit #34", 
//                     "city": "San Jose", 
//                     "country_code": "US", 
//                     "postal_code": "95131", 
//                     "phone": "011862212345678", 
//                     "state": "CA"
//                 }
//             }, 
//             "amount": {
//                 "total": "4", 
//                 "currency": "USD", 
//                 "details": {
//                     "subtotal": "4", 
//                     "tax": "0.00", 
//                     "shipping": "0.00", 
//                     "handling_fee": "0.00", 
//                     "shipping_discount": "0.00", 
//                     "insurance": "0.00"
//                 }
//             }
//         }
//     ]
// };


//     const create_payment_json = {
//     "intent": "sale",
//     "payer": {
//       "payment_method": "paypal"
//     },
//     "transactions": [
//       {
//         "amount": {
//           "total": "30.00",
//           "currency": "USD",
//           "details": {
//             "subtotal": "30.00",
//             "tax": "0.00",
//             "shipping": "0.00",
//             "handling_fee": "0.00",
//             "shipping_discount": "0.00",
//             "insurance": "0.00"
//           }
//         },
//         "description": "The payment transaction description.",
//         // "custom": "EBAY_EMS_90048630024435",
//         "invoice_number": "88787589673",
//         "payment_options": {
//           "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
//         },
//         // "soft_descriptor": "ECHI5786786",
//         "item_list": {
//           "items": [
//             {
//               "name": "hat",
//               "description": "Brown hat.",
//               "quantity": "5",
//               "price": "3",
//               "tax": "0.01",
//               "sku": "1",
//               "currency": "USD"
//             },
//             {
//               "name": "handbag",
//               "description": "Black handbag.",
//               "quantity": "1",
//               "price": "15",
//               "tax": "0.02",
//               "sku": "product34",
//               "currency": "USD"
//             }
//           ],
//           "shipping_address": {
//             "recipient_name": "Brian Robinson",
//             "line1": "4th Floor",
//             "line2": "Unit #34",
//             "city": "San Jose",
//             "country_code": "US",
//             "postal_code": "95131",
//             "phone": "011862212345678",
//             "state": "CA"
//           }
//         }
//       }
//     ],
//     "note_to_payer": "Contact us for any questions on your order.",
//     "redirect_urls": {
//       "return_url": "http://localhost:3000/paymentSuccess",
//       "cancel_url": "http://localhost:3000/paymentCancel"
//     }
// };


    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            // throw error;
            console.log(error.response.details);
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