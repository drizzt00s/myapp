var express = require('express');
var utility = require("../public/javascripts/utility");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  var userData = req.session.userData;
  var loginInfo = "Sign in";
  var isDisplayed = "";
  if(!userData){
      //用户未登录
      loginInfo = loginInfo;
      isDisplayed = "show";
    }else{
      //用户已登录
      loginInfo = userData.account;
      isDisplayed = "hide";
    }


  var connection = utility.createConnection("localhost", "root", "YES", "3306", "app");
  utility.connect(connection);
  connection.query("select * from product_l1", function(err, gpdLists){
    if(err){
      throw err;
    }
    connection.query("select * from product_l2", function(err, subGpdLists){
      if(err){
        throw err;
      }
      connection.query("select * from product_l3", function(err, d){
        if(err){
          throw err;
        }
        if(userData){
          var sql = "SELECT * From user WHERE email" + "=?";
          var sqlValue = [loginInfo];
          connection.query(sql,sqlValue,function(err, userResult){
            if(err){
              throw err;
            }
            var myName = userResult[0].lastName + " " + userResult[0].firstName;
            res.render('index', {title:'Express',gpdLists:gpdLists,subGpdLists:subGpdLists,lvsubGpdLists3:d,loginInfo:loginInfo,isDisplayed:isDisplayed});
          });
        }
        global.gpdLists = gpdLists;
        global.subGpdLists = subGpdLists;
        global.lvsubGpdLists3 = d;
        global.loginInfo = loginInfo;
        global.isDisplayed = isDisplayed;
        console.log(loginInfo);
        console.log(isDisplayed);
        res.render('index', {title:'Express',gpdLists:gpdLists,subGpdLists:subGpdLists,lvsubGpdLists3:d,loginInfo:loginInfo,isDisplayed:isDisplayed});
      });
    });
  });
});

module.exports = router;
