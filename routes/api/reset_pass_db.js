var express = require('express');
var utility = require("../../public/javascripts/utility");
var db_config = require("../db/db_config");
var router = express.Router();

router.post("/", function(req, res, next){
    var newPass = req.body.newPass;
    var mail = req.body.mail;
    var md5 = utility.toCrypto();
    var password_login_sec = md5.update(newPass).digest('hex');
    var pool = global.pool ? global.pool :utility.createConnectionPool(
        db_config.host,
        db_config.username,
        db_config.password,
        db_config.port,
        db_config.database,db_config.pool);
    const sql = "update user set password=" + "'" + password_login_sec + "'" + " where email=" + "'" + mail + "'";

    pool.getConnection(function(err,connection){
        if(err){
            console.log(err);
        }
        connection.query(sql, function (err, result) {
            if(err){
                console.log(err);
            }
            connection.release();
            res.send({
                code:1,
                data:"reset password success."
            });
        });

    });


});
module.exports = router;