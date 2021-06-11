var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next){
    if(req.session.userData){
        

        req.session.userData = null;
        req.session.destroy(function () {
            var data = {
                code:1
            };
            res.send(data);
        });
    } else {
        throw new Error("用户session不存在 退出失败");
    }
});

module.exports = router;