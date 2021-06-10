var express = require('express');
var utility = require("../public/javascripts/utility");
var router = express.Router();

router.post('/', function(req, res, next) {
    // console.log(req.body.pid);
    var pid = req.body.pid;
    // var connection = utility.createConnection("localhost", "root", "YES", "3306", "app");
    var connection = utility.createConnection("rm-bp1oo27t8762xhlob0o.mysql.rds.aliyuncs.com", "lab_1644820068", "454ebe8be6ea_#@Aa", "3306", "rds_mysql_16099qvb");
    var sql = "SELECT * FROM ques WHERE pid" + "=?";
    var sqlValue = [pid];
    utility.connect(connection);
    connection.query(sql,sqlValue,function(err, result){
        if(err){
            throw  err;
        }
        connection.end();
        res.send({
            code:1,
            data:result
        });
    })
});
module.exports = router;