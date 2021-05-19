var express = require('express');
var utility = require("../public/javascripts/utility");
var router = express.Router();

router.post("/", function(req, res, next){
    var question = req.body.question;
    var mail = req.body.acc_email;
    var img = req.body.img;
    var pd_des = req.body.pd_des;
    console.log(question)
    console.log(mail)
    console.log(img)
    console.log(pd_des)


    var connection = utility.createConnection("localhost", "root", "YES", "3306", "app");
    utility.connect(connection);
    var sqlValue = [question,img,pd_des,"null",mail,"null"];
    var sql = "INSERT INTO ques (ques,img,pd_des,answ,ques_user,ques_admin) VALUES(?,?,?,?,?,?)";
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