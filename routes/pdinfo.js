var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
console.log(req.query.pid);


  res.render('pdinfo');
});

module.exports = router;