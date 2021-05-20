var express = require('express');
var mysql = require("mysql");
var utility = require("../public/javascripts/utility");
var router = express.Router();

router.get("/", function(req, res, next){
    console.log(req.session.adminData);
    if(req.session.adminData){
        req.session.adminData = null;
        var data = {
            code:1
        };
        res.send(data);
    } else {
        throw new Error("管理员session不存在 退出失败");
    }
});

module.exports = router;