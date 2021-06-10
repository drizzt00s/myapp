var express = require('express');
var mysql = require("mysql");
var utility = require("../public/javascripts/utility");
var router = express.Router();

router.get("/", function(req, res, next){
    var userData = req.session.userData;
    if(!userData){
        res.send({
            code:0
        })
    }
    else{
        var sql = "SELECT * From user WHERE email" + "=?";
        var sqlValue = [userData.account];
        // var connection = utility.createConnection("localhost", "root", "YES", "3306", "app");
        var connection = utility.createConnection("rm-bp1oo27t8762xhlob0o.mysql.rds.aliyuncs.com", "lab_1644820068", "454ebe8be6ea_#@Aa", "3306", "rds_mysql_16099qvb");
        utility.connect(connection);
        connection.query(sql,sqlValue,function(err,data){
            if(err){
                throw err;
            }
            connection.end();
            var fullname = data[0].lastName + " " + data[0].firstName;
            res.send({
                code:1,
                d:fullname
            });
        });
    }
   
});

module.exports = router;