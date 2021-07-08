var mysql = require("mysql");
var db_config = require("../routes/db/db_config");

var pmt = {

    payment_success_url_local:'http://localhost:3000/paymentSuccess',

    payment_success_url:'http://kongyuecn.com/paymentSuccess',

    checkout_update_cart_session:function(checkoutCart, totalCart){
        var checkoutPd = checkoutCart.pdList;
        var cartPd = totalCart.pdList;
        for(var i = 0; i < cartPd.length; i++){
            for(var q = 0; q < checkoutPd.length; q++){
                if(checkoutPd[q].id == cartPd[i].id){
                    cartPd.splice(i, 1);
                }
            }
        }
        totalCart.pdList = cartPd;
        var checkoutPdPrice = checkoutCart.cartPrice;
        var cartPdPrice = totalCart.cartPrice;
        var checkoutedPdPrice = parseInt(cartPdPrice) - parseInt(checkoutPdPrice);
        totalCart.cartPrice = checkoutedPdPrice;
        return totalCart;
    },
    checkout_update_cart_db:function(){

    }
};
module.exports = pmt;

