var express = require('express');
var utility = require("../public/javascripts/utility");
var db_config = require("./db/db_config");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var userData = req.session.userData;
  var loginInfo = "Sign in";
  var isDisplayed = "";
  if(!userData){
    console.log("database!!!!!!!!!!!!!!!!");
      //用户未登录
      loginInfo = loginInfo;
      isDisplayed = "show";

      var pool = global.pool ? global.pool :utility.createConnectionPool(
          db_config.host,
          db_config.username,
          db_config.password,
          db_config.port,
          db_config.database,db_config.pool);

      pool.getConnection(function(err,connection){
          if(err){
              throw err;
          }
          connection.query("select * from product_l1",function(err, gpdLists){
              if(err){
                  throw err;
              }
              connection.query("select * from product_l2",function(err, subGpdLists){
                  if(err){
                      throw err;
                  }
                  connection.query("select * from product_l3",function(err, d){
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
                              connection.release();
                              // var myName = userResult[0].lastName + " " + userResult[0].firstName;
                              res.render('index', {title:'Express',gpdLists:gpdLists,subGpdLists:subGpdLists,lvsubGpdLists3:d,loginInfo:loginInfo,isDisplayed:isDisplayed});
                          })
                      }
                      global.gpdLists = gpdLists;
                      global.subGpdLists = subGpdLists;
                      global.lvsubGpdLists3 = d;
                      global.loginInfo = loginInfo;
                      global.isDisplayed = isDisplayed;
                      res.render('index', {title:'Express',gpdLists:gpdLists,subGpdLists:subGpdLists,lvsubGpdLists3:d,loginInfo:loginInfo,isDisplayed:isDisplayed});
                  });
              });
          });
      });



    // global.pool.query("select * from product_l1", function(err, gpdLists){
    //     if(err){
    //       throw err;
    //     }
    //   global.pool.query("select * from product_l2", function(err, subGpdLists){
    //       if(err){
    //         throw err;
    //       }
    //     global.pool.query("select * from product_l3", function(err, d){
    //         if(err){
    //           throw err;
    //         }
    //         if(userData){
    //           var sql = "SELECT * From user WHERE email" + "=?";
    //           var sqlValue = [loginInfo];
    //           global.pool.query(sql,sqlValue,function(err, userResult){
    //             if(err){
    //               throw err;
    //             }
    //             // var myName = userResult[0].lastName + " " + userResult[0].firstName;
    //             res.render('index', {title:'Express',gpdLists:gpdLists,subGpdLists:subGpdLists,lvsubGpdLists3:d,loginInfo:loginInfo,isDisplayed:isDisplayed});
    //           });
    //         }
    //         global.gpdLists = gpdLists;
    //         global.subGpdLists = subGpdLists;
    //         global.lvsubGpdLists3 = d;
    //         global.loginInfo = loginInfo;
    //         global.isDisplayed = isDisplayed;
    //         res.render('index', {title:'Express',gpdLists:gpdLists,subGpdLists:subGpdLists,lvsubGpdLists3:d,loginInfo:loginInfo,isDisplayed:isDisplayed});
    //       });
    //     });
    //   });
















    }else{
      console.log("global!!!!!!!!!!!!!!!!");
      //用户已登录 从global拿值 不去db
      loginInfo = userData.account;
      isDisplayed = "hide";
      res.render('index', {title:'Express',gpdLists:global.gpdLists,subGpdLists:global.subGpdLists,lvsubGpdLists3:global.lvsubGpdLists3,loginInfo:loginInfo,isDisplayed:global.isDisplayed});
    }
});

module.exports = router;
