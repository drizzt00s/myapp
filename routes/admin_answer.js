var express = require('express');
var utility = require("../public/javascripts/utility");
var global_store = require("../utlity/global_val");
var router = express.Router();

router.get('/', function(req, res, next) {
    if(!(req.session.adminData)){
        res.redirect("/admin_login");
        return false;
    }
    var adminAcc = req.session.adminData.account;
    // var connection = utility.createConnection("localhost", "root", "YES", "3306", "app");
    var connection = utility.createConnection("rm-bp1oo27t8762xhlob0o.mysql.rds.aliyuncs.com", "lab_1644820068", "454ebe8be6ea_#@Aa", "3306", "rds_mysql_16099qvb");
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
                connection.end();
                var thisAdminName = name[0].name;
                global.thisAdminName = thisAdminName;
               res.render("admin_answer",{adminDatas:adminDatas,result:result,admin:thisAdminName});
            });

           

        });

    });
});

module.exports = router;