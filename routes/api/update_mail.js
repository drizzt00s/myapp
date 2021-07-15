var express = require('express');
var utility = require("../../public/javascripts/utility");
var db_config = require("../db/db_config");
var router = express.Router();

router.post("/", function(req, res, next){
    var newMail = req.body.newMail;
    var mail = req.session.userData.account;

    var sql = "UPDATE user set email=" + "'" + newMail +"'" + " WHERE email="+ "'" + mail +"'"
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
        connection.query(sql,function(err, result){
            if(err){
                throw err;
            }





            connection.release();
            res.send({
                code:1,
                data:"You mail has been updated."
            });
        })
    });


});
module.exports = router;