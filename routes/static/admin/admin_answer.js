var express = require('express');
var router = express.Router();
var db_config = require("../../db/db_config");
var utility = require("../../../public/javascripts/utility");

router.get('/', function(req, res, next) {

    require("dotenv").config();
    let host = process.env.HOST;
    console.log(`current host: ${host}`);

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
        connection.query("select * from ques" ,function(err, result){
            if(err){
                throw err;
            }
            connection.query("select * from admin",function (err,d) {
                if(err){
                    throw err;
                }
                var adminDatas = d;
                connection.query("select name from admin where account= " +"'" + adminAcc +"'",function (err,name) {
                    if(err){
                        throw err;
                    }

                    connection.query("select * from quote",function (err,quotes) {
                        if(err){
                            throw err;
                        }
                        connection.query("select * from quote_anonymous",function (err,quote_anonymous) {
                            if(err){
                                throw err;
                            }

                            var thisAdminName = name[0].name;
                            global.thisAdminName = thisAdminName;

                            res.render("admin/admin_answer",{adminDatas:adminDatas,
                                result:result,
                                admin:thisAdminName,
                                quotes:quotes,
                                quote_anonymous:quote_anonymous,
                                host:host
                            });

                        })

                    })
                });
            });
        })
    });
});

module.exports = router;