var express = require('express');
var utility = require("../public/javascripts/utility");
var router = express.Router();

router.get('/', function(req, res, next) {
    if(!(req.session.adminData)){
        res.redirect("/admin_login");
        return false;
    }
    adminAcc = req.session.adminData.account;
    var connection = utility.createConnection("localhost", "root", "YES", "3306", "app");
    utility.connect(connection);
    connection.query("select * from ques", function (err,result) {
        if(err){
            throw  err;
        }
         connection.query("select * from admin", function(err,d){
            if(err){
                throw  err;
            }
            var adminDatas = d;
            connection.query("select name from admin where account= " +"'" + adminAcc +"'", function(err,name){
                if(err){
                    throw  err;
                }
                
               res.render("admin_answer",{adminDatas:adminDatas,result:result,admin:name[0].name});
            });

           

        });

    });
});

module.exports = router;