var express = require('express');
var mysql = require("mysql");
var utility = require("../public/javascripts/utility");
var router = express.Router();

router.post("/", function(req, res, next){
    var searchContents = req.body.searchContents;
    console.log(searchContents);
    var connection = utility.createConnection("localhost", "root", "YES", "3306", "app");
    utility.connect(connection);
    connection.query("SELECT * FROM product_l3 WHERE des like " + "'%" + searchContents + "%'",function (err,data) {
        if(err){
            throw err;
        }
        var dataLength = 0;
        for(var i=0; i<data.length; i++){
            dataLength++
        }
        console.log(dataLength);
        req.session.searchResult = {searchContents:searchContents,searchResult:data,dataLength:dataLength};
        res.send({
            code:1
        });
    });




});

module.exports = router;