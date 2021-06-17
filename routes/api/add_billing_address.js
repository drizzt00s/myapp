var express = require('express');
var utility = require("../../public/javascripts/utility");
var db_config = require("../db/db_config");
var router = express.Router();

router.post('/', function(req, res, next) {
    if(!req.session.userData){
        throw new Error("user session not found.");
    }
    var add_shipping_address_info = req.body.add_shipping_address_info;
    console.log(add_shipping_address_info);

    var user_mail = req.session.userData.account;
    var sql = "INSERT INTO billing_address (mail,address_book_id,address_type,company_type," +
        "country_code,default_address,entry_city,entry_company," +
        "entry_country_id,entry_country_name,entry_firstname," +
        "entry_lastname,entry_postcode,entry_state,entry_street_address," +
        "entry_suburb,entry_tax_number,entry_telephone,tel_prefix) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    var sqlValue = [user_mail,
        add_shipping_address_info.address_book_id,
        add_shipping_address_info.address_type,
        add_shipping_address_info.company_type,
        add_shipping_address_info.country_code,
        add_shipping_address_info.default_address,
        add_shipping_address_info.entry_city,
        add_shipping_address_info.entry_company,
        add_shipping_address_info.entry_country_id,
        add_shipping_address_info.entry_country_name,
        add_shipping_address_info.entry_firstname,
        add_shipping_address_info.entry_lastname,
        add_shipping_address_info.entry_postcode,
        add_shipping_address_info.entry_state,
        add_shipping_address_info.entry_street_address,
        add_shipping_address_info.entry_suburb,
        add_shipping_address_info.entry_tax_number,
        add_shipping_address_info.entry_telephone,
        add_shipping_address_info.tel_prefix,
    ];
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
            connection.release();
            res.send({
                code:1
            });
        })
    });
});

module.exports = router;