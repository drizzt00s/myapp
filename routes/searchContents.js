var express = require('express');
var mysql = require("mysql");
var utility = require("../public/javascripts/utility");
var router = express.Router();

router.post("/", function(req, res, next){
    var searchContents = req.body.searchContents;
    console.log(searchContents);
    // var connection = utility.createConnection("localhost", "root", "YES", "3306", "app");
    var connection = utility.createConnection("rm-bp1oo27t8762xhlob0o.mysql.rds.aliyuncs.com", "lab_1644820068", "454ebe8be6ea_#@Aa", "3306", "rds_mysql_16099qvb");
    utility.connect(connection);
    // connection.query("SELECT * FROM product_l3 LEFT JOIN product_specifications ON product_l3.id = product_specifications.id WHERE des like + " + "'%" + searchContents + "%'" ,function (err,data){
    //     if(err){
    //         throw err;
    //     }
    //     // console.log(data);
    //     var dataLength = 0;
    //     req.session.searchResult = {
    //             searchContents:searchContents,
    //             searchResult:data,
    //             dataLength:dataLength,
    //             spec:spec
    //     };
    // });

    connection.query("SELECT * FROM product_l3 WHERE des like " + "'%" + searchContents + "%'",function (err,data) {
        if(err){
            throw err;
        }
        connection.end();
        var dataLength = 0;
        for(var i=0; i<data.length; i++){
            dataLength++
        }
        console.log(data);
        req.session.searchResult = {searchContents:searchContents,searchResult:data,dataLength:dataLength};
        res.send({code:1});
    });




});

module.exports = router;