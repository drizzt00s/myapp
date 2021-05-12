var express = require('express');
var utility = require("../public/javascripts/utility");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
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
      res.render('index', { title: 'Express',gpdLists:gpdLists,subGpdLists:subGpdLists});
    });
  });
});

module.exports = router;
