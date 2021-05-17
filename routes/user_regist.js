var express = require('express');
var mysql = require("mysql");
var utility = require("../public/javascripts/utility");
var router = express.Router();

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
                    phone_regist,
                    company_regist,
                    password_regist
                ];
    var sql = "INSERT INTO user (firstName,lastName,email,password,phone,companyName) VALUES(?,?,?,?,?,?)";
    var connection = utility.createConnection("localhost", "root", "YES", "3306", "app");
    utility.connect(connection);
    connection.query(sql,sqlValue,function(err, result){
        if(err){
            throw err;
        }
        console.log("insert ok");
        var userData = {"user_phone":phone_regist};
        req.session.userData = userData;
        res.send({"isRegistSuccess":1});
    });
    
});
module.exports = router;