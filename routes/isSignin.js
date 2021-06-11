var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next){
    var userData = req.session.userData;
    if(!userData){
        //用户未登录
        res.send({
            code:0
        });
    }else{
        //用户已登录
        console.log(userData.account);
        res.send({
            code:1,
            acc_email:userData.account
        });
    }
});
module.exports = router;