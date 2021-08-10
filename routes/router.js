let rt = {
    initRouter:function (app){
        //all static router:

        var indexRouter = require('./static/index');
        //home page
        var registRouter = require('./static/regist/regist');
        //register
        var loginRouter = require('./static/login/login');
        //login
        var my_dashboard_Router = require('./static/user/my_dashboard');
        var order_history_Router = require('./static/user/order_history');
        var quoteHistory_Router = require('./static/user/quoteHistory');
        var my_dashboard_addressbook_Router = require('./static/user/my_dashboard_addressbook');
        var cart_Router = require('./static/user/cart');
        var edit_my_account_Router = require('./static/user/edit_my_account');
        var quote_history_detail_Router = require('./static/user/quote_history_detail');
        //user pages

        var all_pds_Router = require('./static/productions/all_pds');
        var sup_pdinfo_Router = require('./static/productions/sup_pdinfo');
        var sub_pdinfo_Router = require('./static/productions/sub_pdinfo');
        var pdinfoRouter = require('./static/productions/pdinfo');
        //production pages

        var admin_login_Router = require('./static/admin/admin_login');
        var admin_answer_Router = require('./static/admin/admin_answer');
        var updateProduct_Router = require('./static/admin/updateProduct');
        var editProduct_Router = require('./static/admin/editProduct');
        var indexLc_Router = require('./static/admin/indexLc');
        var admin_Product_Questions_Router = require('./static/admin/admin_Product_Questions');
        var admin_customer_queries_Router = require('./static/admin/admin_customer_queries');
        var admin_quotes_anonymous_Router = require('./static/admin/admin_quotes_anonymous');
        var admin_quotes_Router = require('./static/admin/admin_quotes');
        var edit_pdinfo_Router = require('./static/admin/edit_pdinfo');
        var admin_ans_Router = require('./static/admin/admin_ans');
        var editPdFail_Router = require('./static/admin/editPdFail');
        var editPdSuccess_Router = require('./static/admin/editPdSuccess');
        //admin pages

        var confirm_order_Router = require('./static/checkout/confirm_order');
        var orderPaymentPaypal_Router = require('./static/checkout/orderPaymentPaypal');
        var paymentSuccess_Router = require('./static/checkout/paymentSuccess');
        var order_history_details_Router = require('./static/checkout/order_history_details');
        //checkout

        var live_chat_mail_Router = require('./static/communications/live_chat_mail');
        var livechat_Router = require('./static/communications/livechat');
        //communications

        var searchResultRouter = require('./static/search/searchResult');
        //search

        var resPass_Router = require('./static/service/resPass');
        var resetPassword_Router = require('./static/service/resetPassword');
        //regain information


        //dangerous to touch, proceed it with caution
        var subProductRouter = require('./static/subProduct');
        var user_profile_Router = require('./static/user_profile');
        var admin_reply_mail_Router = require('./static/admin_reply_mail');
        var orderPayment_Router = require('./static/orderPayment');
        //dangerous to touch, proceed it with caution

        //api
        var signoutRouter = require('./api/signout');
        var is_signin_Router = require('./api/isSignin');
        var admin_signout_Router = require('./api/admin_signout');
        var search_content_Router = require('./api/searchContents')
        var user_regist_Router = require('./api/user_regist');
        var user_login_Router = require('./api/user_login');
        var raise_question_Router = require('./api/raise_question');
        var admin_signin_Router = require('./api/admin_signin');
        var admin_reply_Router = require('./api/admin_reply');
        var qa_Router = require('./api/qa');
        var get_related_pd_Router = require('./api/get_related_pd');
        var live_chat_mail_h_Router = require('./api/live_chat_mail_h');
        var get_userinfo_Router = require('./api/get_userinfo');
        var live_chat_Router = require('./api/live_chat');
        var del_customer_queries_Router = require('./api/del_customer_queries');
        var update_customer_queries_Router = require('./api/update_customer_queries');
        var get_admin_img_Router = require('./api/get_admin_img');
        var add_cart_Router = require('./api/add_cart');
        var update_each_cart_qty_Router = require('./api/pdate_each_cart_qty');
        var del_cart_pd_Router = require('./api/del_cart_pd');
        var confirm_checkout_data_Router = require('./api/confirm_checkout_data');
        var add_shipping_address_Router = require('./api/add_shipping_address');
        var add_billing_address_Router = require('./api/add_billing_address');
        var set_default_address_Router = require('./api/set_default_address');
        var del_shipping_address_Router = require('./api/del_shipping_address');
        var del_billing_address_Router = require('./api/del_billing_address');
        var edit_shipping_addr_Router = require('./api/edit_shipping_addr_address');
        var ask_quote_Router = require('./api/ask_quote');
        var order_payment_Router = require('./api/order_payment');
        var payment_Router = require('./api/payment');
        var get_order_history_Router = require('./api/get_order_history');
        var get_order_history_details_Router = require('./api/get_order_history_details');
        var get_Acct_data_Router = require('./api/get_Acct_data');
        var reply_quote_Router = require('./api/reply_quote');
        var reply_quote_anonymous_Router = require('./api/reply_quote_anonymous');
        var update_pass_Router = require('./api/update_pass');
        var getAllPd_Router = require('./api/getAllPd');
        var reset_password_Router = require('./api/reset_password');
        var reset_pass_db_Router = require('./api/reset_pass_db');
        var update_product_Router = require('./api/update_product');
        var editSpePd_Router = require('./api/editSpePd');
        var GetSupCat_Router = require('./api/getSupCat');


        //use api
        app.use('/user_regist',user_regist_Router);
        app.use('/user_login',user_login_Router);
        app.use('/searchContents',search_content_Router);
        app.use('/raise_question',raise_question_Router);
        app.use('/admin_signin',admin_signin_Router);
        app.use('/admin_reply',admin_reply_Router);
        app.use('/qa',qa_Router);
        app.use('/get_related_pd',get_related_pd_Router);
        app.use('/live_chat_mail_h',live_chat_mail_h_Router);
        app.use('/get_userinfo',get_userinfo_Router);
        app.use('/live_chat',live_chat_Router);
        app.use('/del_customer_queries',del_customer_queries_Router);
        app.use('/update_customer_queries',update_customer_queries_Router);
        app.use('/get_admin_img',get_admin_img_Router);
        app.use('/add_cart',add_cart_Router);
        app.use('/update_each_cart_qty',update_each_cart_qty_Router);
        app.use('/del_cart_pd',del_cart_pd_Router);
        app.use('/confirm_checkout_data',confirm_checkout_data_Router);
        app.use('/add_shipping_address',add_shipping_address_Router);
        app.use('/add_billing_address',add_billing_address_Router);
        app.use('/set_default_address',set_default_address_Router);
        app.use('/del_shipping_address',del_shipping_address_Router);
        app.use('/del_billing_address',del_billing_address_Router);
        app.use('/edit_shipping_addr',edit_shipping_addr_Router);
        app.use('/ask_quote',ask_quote_Router);
        app.use('/order_payment',order_payment_Router);
        app.use('/payment',payment_Router);
        app.use('/get_order_history',get_order_history_Router);
        app.use('/get_order_history_details',get_order_history_details_Router);
        app.use('/get_Acct_data',get_Acct_data_Router);
        app.use('/reply_quote',reply_quote_Router);
        app.use('/reply_quote_anonymous',reply_quote_anonymous_Router);
        app.use('/update_pass',update_pass_Router);
        app.use('/getAllPd',getAllPd_Router);
        app.use('/reset_password',reset_password_Router);
        app.use('/reset_pass_db',reset_pass_db_Router);
        app.use('/update_product',update_product_Router);
        app.use('/editSpePd',editSpePd_Router);
        app.use('/GetSupCat',GetSupCat_Router);

        //use static
        app.use('/', indexRouter);
        app.use('/sbpId',subProductRouter);
        app.use('/pdinfo',pdinfoRouter);
        app.use('/regist',registRouter);
        app.use('/login',loginRouter);
        app.use('/user_profile',user_profile_Router);
        app.use('/signout',signoutRouter);
        app.use('/searchResult',searchResultRouter);
        app.use('/is_sign_in',is_signin_Router);
        app.use('/admin_answer',admin_answer_Router);
        app.use('/admin_login',admin_login_Router);
        app.use('/admin_signout',admin_signout_Router);
        app.use('/live_chat_mail',live_chat_mail_Router);
        app.use('/admin_reply_mail',admin_reply_mail_Router);
        app.use('/admin_ans',admin_ans_Router);
        app.use('/admin_Product_Questions',admin_Product_Questions_Router);
        app.use('/admin_customer_queries',admin_customer_queries_Router);
        app.use('/cart',cart_Router);
        app.use('/confirm_order',confirm_order_Router);
        app.use('/my_dashboard',my_dashboard_Router);
        app.use('/my_dashboard_addressbook',my_dashboard_addressbook_Router);
        app.use('/sub_pdinfo',sub_pdinfo_Router);
        app.use('/admin_quotes',admin_quotes_Router);
        app.use('/orderPayment',orderPayment_Router);
        app.use('/orderPaymentPaypal',orderPaymentPaypal_Router);
        app.use('/paymentSuccess',paymentSuccess_Router);
        app.use('/order_history',order_history_Router);
        app.use('/order_history_details',order_history_details_Router);
        app.use('/quoteHistory',quoteHistory_Router);
        app.use('/admin_quotes_anonymous',admin_quotes_anonymous_Router);
        app.use('/quote_history_detail',quote_history_detail_Router);
        app.use('/edit_my_account',edit_my_account_Router);
        app.use('/all_pds',all_pds_Router);
        app.use('/livechat',livechat_Router);
        app.use('/resPass',resPass_Router);
        app.use('/resetPassword', resetPassword_Router);
        app.use('/updateProduct', updateProduct_Router);
        app.use('/indexLc', indexLc_Router);
        app.use('/editProduct', editProduct_Router);
        app.use('/edit_pdinfo', edit_pdinfo_Router);
        app.use('/sup_pdinfo', sup_pdinfo_Router);

        app.use('/editPdFail', editPdFail_Router);
        app.use('/editPdSuccess', editPdSuccess_Router);



    }
};

module.exports = rt;