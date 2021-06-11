var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('admin_ans');
});
module.exports = router;