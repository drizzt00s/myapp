var express = require('express');
var utility = require("../public/javascripts/utility");
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render("admin_login");
});

module.exports = router;