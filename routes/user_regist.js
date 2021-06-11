var express = require('express');
var router = express.Router();
var db_config = require("./db/db_config");
var utility = require("../public/javascripts/utility");

router.post("/", function(req, res, next){
    var firsrtname_regist = req.body.firsrtname_regist;
    var lastname_regist = req.body.lastname_regist;
    var email_regist = req.body.email_regist;
    var password_regist = req.body.password_regist;
    var phone_regist = req.body.phone_regist;
    var company_regist = req.body.company_regist;
    var md5 = utility.toCrypto();
    var password_regist = md5.update(password_regist).digest('hex');
    var sqlValue = [firsrtname_regist,
                    lastname_regist,
                    email_regist,
                    password_regist,
                    phone_regist,
                    company_regist
                ];
    var sql = "INSERT INTO user (firstName,lastName,email,password,phone,companyName) VALUES(?,?,?,?,?,?)";


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
            var sqlValue = [email_regist];
            var sql = "INSERT INTO cart (mail) VALUES(?)";
            connection.query(sql,sqlValue,function (err, result) {
                if(err){
                    throw err;
                }
                connection.release();
                var userData = {"account":email_regist};
                req.session.userData = userData;
                req.session.cart = {pdList:[],cartPrice:''};
                res.send({"isRegistSuccess":1});
            });
    });
});


});
module.exports = router;