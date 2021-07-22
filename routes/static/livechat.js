var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    const  username = req.query.name;

    res.render("livechat",{
        username:username
    });


});

module.exports = router;