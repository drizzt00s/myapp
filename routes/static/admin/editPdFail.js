var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if(!(req.session.adminData)){
        res.redirect("/admin_login");
        return false;
    }
    res.render('admin/editPdFail');
});

module.exports = router;