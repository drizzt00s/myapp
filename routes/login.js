var express = require('express');
var utility = require("../public/javascripts/utility");
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render("login");
});

module.exports = router;