var express = require('express');
var mysql = require("mysql");
var utility = require("../public/javascripts/utility");
var router = express.Router();

router.get("/", function(req, res, next){
    var userData = req.session.userData;
    console.log(userData);
    if(!userData){
        res.send({
            code:0
        })
    }
    else{
        var sql = "SELECT * From user WHERE email" + "=?";
        var sqlValue = [userData.account];
        var connection = utility.createConnection("localhost", "root", "YES", "3306", "app");
        utility.connect(connection);
        connection.query(sql,sqlValue,function(err,data){
            if(err){
                throw err;
            }
            var fullname = data[0].lastName + " " + data[0].firstName;
            console.log(fullname);
            res.send({
                code:1,
                d:fullname
            });
        });
    }
   
});

module.exports = router;