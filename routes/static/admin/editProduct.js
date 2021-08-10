var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

    if(!(req.session.adminData)){
        res.redirect("/admin_login");
        return false;
    }
    var adminAcc = req.session.adminData.account;

    res.render('admin/editProduct');

    // var sbpId = req.query.id;

});

module.exports = router;