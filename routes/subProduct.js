var express = require('express');
var utility = require("../public/javascripts/utility");
var router = express.Router();


router.get('/', function(req, res, next) {
  var sbpId = req.query.id;
  // console.log(sbpId);

  // var connection = utility.createConnection("localhost", "root", "YES", "3306", "app");
  var connection = utility.createConnection("rm-bp1oo27t8762xhlob0o.mysql.rds.aliyuncs.com", "lab_1644820068", "454ebe8be6ea_#@Aa", "3306", "rds_mysql_16099qvb");
  utility.connect(connection);
  connection.query("select * from product_l3 where parentID=" + sbpId, function(err, d){
    if(err){
      throw err;
    }
    connection.end();
    // console.log(JSON.stringify(d));
    res.render('subProduct', { title: 'Express',data:d});
  });

  // res.render('subProduct');



});

module.exports = router;