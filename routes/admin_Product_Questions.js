var express = require('express');
var utility = require("../public/javascripts/utility");

var router = express.Router();

router.get('/', function(req, res, next) {
    if(!(req.session.adminData)){
        res.redirect("/admin_login");
        return false;
    }
    var adminAcc = req.session.adminData.account;
    var connection = utility.createConnection("localhost", "root", "YES", "3306", "app");
    utility.connect(connection);
    connection.query("select * from ques", function (err,result) {
        if(err){
            throw  err;
        }
        connection.query("select name from admin where account= " +"'" + adminAcc +"'", function (err,result) {
            if(err){
                throw  err;
            }
        });
        connection.end();
        res.render("admin_Product_Questions",{result:result,admin:global.thisAdminName});
    });
});

module.exports = router;