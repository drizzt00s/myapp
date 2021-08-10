var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    const mail = req.query.m;
    res.render("service/resetPassword",{
        mail:mail
    });
});

module.exports = router;