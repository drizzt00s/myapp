var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if(!(req.session.adminData)){
        res.redirect("/admin_login");
        return false;
    }
    const pid = req.query.pid;
    res.render('admin/editPdSuccess',{
        pid:pid
    });
});

module.exports = router;