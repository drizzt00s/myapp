var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    var searchResult = req.session.searchResult;
    res.render("searchResult",{searchContents:searchResult.searchContents,searchResult:searchResult.searchResult,dataLength:searchResult.dataLength});
});

module.exports = router;