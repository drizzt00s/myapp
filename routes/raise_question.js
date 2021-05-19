var express = require('express');
var utility = require("../public/javascripts/utility");
var router = express.Router();

router.post("/", function(req, res, next){
    var question = req.body.question;
    var mail = req.body.acc_email;
    var connection = utility.createConnection("localhost", "root", "YES", "3306", "app");
    utility.connect(connection);
    var sqlValue = [question, mail];
    var sql = "INSERT INTO ques (ques,ques_user) VALUES(?,?)";
    connection.query(sql,sqlValue,function (err, result) {
        if(err){
            throw  err;
        }
        res.send({
            code:1,
            data:"You problem has been submit."
        });
    });




});
module.exports = router;