var express = require('express');
var utility = require("../public/javascripts/utility");
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render("live_chat_mail");
});

module.exports = router;