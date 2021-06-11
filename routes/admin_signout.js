var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next){
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