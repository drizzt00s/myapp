var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render("communications/live_chat_mail");
});

module.exports = router;