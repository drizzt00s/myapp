var express = require('express');
var utility = require("../public/javascripts/utility");
var router = express.Router();

router.post('/', function(req, res, next) {
    var email = req.body.email;
    var connection = utility.createConnection("localhost", "root", "YES", "3306", "app");
    utility.connect(connection);
    var sql = "SELECT * From user WHERE email" + "=?";
    var sqlValue = [email];
    connection.query(sql,sqlValue,function(err, result){
        if(err){
            throw err;
        }
        res.send({
            code:1,
            data:result
        });
    })
});

module.exports = router;