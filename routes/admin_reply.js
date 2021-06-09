var express = require('express');
var utility = require("../public/javascripts/utility");
var router = express.Router();

router.post('/', function(req, res, next) {
    var reply = req.body.reply;
    var admin = req.body.admin;
    var questionId = req.body.questionId;
    console.log(reply)
    console.log(admin)
    console.log(questionId)
    var connection = utility.createConnection("localhost", "root", "YES", "3306", "app");
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