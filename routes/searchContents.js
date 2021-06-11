var express = require('express');
var utility = require("../public/javascripts/utility");
var db_config = require("./db/db_config");
var router = express.Router();

router.post("/", function(req, res, next){
    var searchContents = req.body.searchContents;

    var pool = global.pool ? global.pool :utility.createConnectionPool(
        db_config.host,
        db_config.username,
        db_config.password,
        db_config.port,
        db_config.database,db_config.pool);

    pool.getConnection(function(err,connection){
        if(err){
            throw err;
        }
        connection.query("SELECT * FROM product_l3 WHERE des like " + "'%" + searchContents + "%'",function(err, data){
            if(err){
                throw err;
            }
            connection.release();
            var dataLength = 0;
            for(var i=0; i<data.length; i++){
                dataLength++
            }
            req.session.searchResult = {searchContents:searchContents,searchResult:data,dataLength:dataLength};
            res.send({code:1});
        })
    });


    // global.pool.query("SELECT * FROM product_l3 WHERE des like " + "'%" + searchContents + "%'",function (err,data) {
    //     if(err){
    //         throw err;
    //     }
    //     global.pool.end();
    //     var dataLength = 0;
    //     for(var i=0; i<data.length; i++){
    //         dataLength++
    //     }
    //     req.session.searchResult = {searchContents:searchContents,searchResult:data,dataLength:dataLength};
    //     res.send({code:1});
    // });






});

module.exports = router;