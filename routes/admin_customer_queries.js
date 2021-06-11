var express = require('express');
var utility = require("../public/javascripts/utility");
var db_config = require("./db/db_config");
var router = express.Router();

router.get('/', function(req, res, next) {
    if(!(req.session.adminData)){
        res.redirect("/admin_login");
        return false;
    }


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
        connection.query("select * from ques", function(err, result){
            if(err){
                throw err;
            }
            connection.release();
            res.render("admin_customer_queries",{admin:global.thisAdminName});
        })
    });
});

module.exports = router;