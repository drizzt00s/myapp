var express = require('express');
var utility = require("../../public/javascripts/utility");
var db_config = require("../db/db_config");
var fs = require('fs');
var router = express.Router();

router.post("/", function(req, res, next){

    const replay = req.body.replay;





    // var question = req.body.question;
    // var mail = req.body.acc_email;
    // var img = req.body.img;
    // var pd_des = req.body.pd_des;
    // var url = req.body.url;
    // var pid = req.body.pid;

    // var sqlValue = [question,img,pd_des,"null",mail,"null",url,pid];
    // var sql = "INSERT INTO ques (ques,img,pd_des,answ,ques_user,ques_admin,url,pid) VALUES(?,?,?,?,?,?,?,?)";
    //
    // var pool = global.pool ? global.pool :utility.createConnectionPool(
    //     db_config.host,
    //     db_config.username,
    //     db_config.password,
    //     db_config.port,
    //     db_config.database,db_config.pool);
    //
    // pool.getConnection(function(err,connection){
    //     if(err){
    //         throw err;
    //     }
    //     connection.query(sql,sqlValue,function(err, result){
    //         if(err){
    //             throw err;
    //         }
    //         connection.release();
    //         res.send({
    //             code:1,
    //             data:"You problem has been submit."
    //         });
    //     })
    // });







});
module.exports = router;