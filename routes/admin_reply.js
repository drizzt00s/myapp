var express = require('express');
var utility = require("../public/javascripts/utility");
var router = express.Router();

router.post('/', function(req, res, next) {
    var reply = req.body.reply;
    var admin = req.body.admin;
    var questionId = req.body.questionId;
    // var connection = utility.createConnection("localhost", "root", "YES", "3306", "app");
    var connection = utility.createConnection("rm-bp1oo27t8762xhlob0o.mysql.rds.aliyuncs.com", "lab_1644820068", "454ebe8be6ea_#@Aa", "3306", "rds_mysql_16099qvb");
    //var sql = "UPDATE ques (answ,ques_admin) VALUES(?,?) WHERE id=" + "'" + questionId + "'";
    var sql = "UPDATE ques SET answ=" +"'" + reply +"'" + "," + "ques_admin=" +"'" + admin +"'" +"WHERE id="+"'" + questionId +"'";
    utility.connect(connection);
    connection.query(sql,function(err, result){
        if(err){
            throw err;
        }
        connection.end();
        res.send({
            code:1
        });
    })
});

module.exports = router;