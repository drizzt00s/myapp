var express = require('express');
var utility = require("../public/javascripts/utility");
var router = express.Router();

router.post("/", function(req, res, next){
    var question = req.body.question;
    var mail = req.body.acc_email;
    var img = req.body.img;
    var pd_des = req.body.pd_des;
    var url = req.body.url;
    var pid = req.body.pid;



    // var connection = utility.createConnection("localhost", "root", "YES", "3306", "app");
    var connection = utility.createConnection("rm-bp1oo27t8762xhlob0o.mysql.rds.aliyuncs.com", "lab_1644820068", "454ebe8be6ea_#@Aa", "3306", "rds_mysql_16099qvb");
    utility.connect(connection);
    var sqlValue = [question,img,pd_des,"null",mail,"null",url,pid];
    var sql = "INSERT INTO ques (ques,img,pd_des,answ,ques_user,ques_admin,url,pid) VALUES(?,?,?,?,?,?,?,?)";
    connection.query(sql,sqlValue,function (err, result) {
        if(err){
            throw  err;
        }
        connection.end();
        res.send({
            code:1,
            data:"You problem has been submit."
        });
    });




});
module.exports = router;