var express = require('express');
var mysql = require("mysql");
var utility = require("../public/javascripts/utility");
var router = express.Router();

router.get("/", function(req, res, next){
    console.log(req.session.userData);
    if(req.session.userData){
        

        req.session.userData = null;
        var data = {
            code:1 
        };

        req.session.destroy(function(err){
            if(err){
               console.log(err);
            }else{
                res.send(data);
            }
         });


        
    } else {
        throw new Error("用户session不存在 退出失败");
    }
});

module.exports = router;