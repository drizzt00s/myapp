var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    require("dotenv").config();
    let host = process.env.HOST;
    res.render("indexLc",{
        host:host
    });


});

module.exports = router;