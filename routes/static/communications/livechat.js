var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    require("dotenv").config();
    let host = process.env.HOST;

    const  username = req.query.name;

    res.render("communications/livechat",{
        username:username,
        host:host
    });


});

module.exports = router;