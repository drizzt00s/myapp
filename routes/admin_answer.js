var express = require('express');
var utility = require("../public/javascripts/utility");
var router = express.Router();

router.get('/', function(req, res, next) {
    if(!(req.session.adminData)){
        res.redirect("/admin_login");
        return false;
    }
    var connection = utility.createConnection("localhost", "root", "YES", "3306", "app");
    utility.connect(connection);
    connection.query("select * from ques", function (err,result) {
        if(err){
            throw  err;
        }
        res.render("admin_answer",{result:result,admin:req.session.adminData.account});
    });
});

module.exports = router;