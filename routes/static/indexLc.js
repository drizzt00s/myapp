var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

    if(!(req.session.adminData)){
        res.redirect("/admin_login");
        return false;
    }
    var adminAcc = req.session.adminData.account;
    require("dotenv").config();
    let host = process.env.HOST;
    res.render("indexLc",{
        host:host,
        admin:global.thisAdminName
    });


});

module.exports = router;