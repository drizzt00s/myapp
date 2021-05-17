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
        console.log(JSON.stringify(d));
        res.render('index', { title: 'Express',gpdLists:gpdLists,subGpdLists:subGpdLists,lvsubGpdLists3:d,loginInfo:loginInfo,isDisplayed:isDisplayed});
      });

      
      // res.render('index', { title: 'Express',gpdLists:gpdLists,subGpdLists:subGpdLists});
    });
  });
});

module.exports = router;
