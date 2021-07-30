var express = require('express');
var utility = require("../../public/javascripts/utility");
var db_config = require("../db/db_config");
var router = express.Router();

router.get('/', function(req, res, next) {

    if(!(req.session.adminData)){
        res.redirect("/admin_login");
        return false;
    }
    var adminAcc = req.session.adminData.account;



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
        connection.query("select * from product_l1",function(err, pd1){
            if(err){
                throw err;
            }
            connection.query("select * from product_l2",function(err, pd2) {
                if (err) {
                    throw err;
                }

                connection.release();
                res.render('updateProduct',{
                    pd1:pd1,
                    pd2:pd2,
                    admin:thisAdminName,
                });
            })

        })
    });



    // var sbpId = req.query.id;





});

module.exports = router;