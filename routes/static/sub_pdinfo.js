var express = require('express');
var utility = require("../../public/javascripts/utility");
var db_config = require("../db/db_config");
var router = express.Router();

router.get('/', function(req, res, next) {
    var lv2pd_id = req.query.gpid; //二级产品目录id

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
        connection.query("select * from product_l3 where parentID=" + lv2pd_id,function(err, d){
            if(err){
                throw err;
            }
            connection.release();
            res.render('sub_pdinfo', {data:d});
        })
    });

});

module.exports = router;