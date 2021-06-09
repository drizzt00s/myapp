var express = require('express');
var utility = require("../public/javascripts/utility");
var router = express.Router();

router.post('/', function(req, res, next) {
    var adminName = req.body.adminName;
    var connection = utility.createConnection("localhost", "root", "YES", "3306", "app");
    utility.connect(connection);
    var sql = "SELECT img From admin WHERE name" + "=?";
    var sqlValue = [adminName];
    connection.query(sql,sqlValue,function(err, result){
        if (err){
            throw err;
        }
        connection.end();
        res.send({
            code:1,
            data:result
        })
    })
});

module.exports = router;