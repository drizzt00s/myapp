var express = require('express');
var utility = require("../public/javascripts/utility");
var router = express.Router();

router.get('/', function(req, res, next) {
//console.log(req.query.pid);
var pid = req.query.pid;
var connection = utility.createConnection("localhost", "root", "YES", "3306", "app");
utility.connect(connection);
connection.query("select * from product_l3 where id=" + pid, function(err, pdGenerInfo){
    if(err){
      throw err;
    }
    connection.query("select * from product_specifications where id=" + pid, function(err, specInfo){
        if(err){
          throw err;
        }
        var pdInformation = specInfo[0].product_infomation;
        var pdDescription = specInfo[0].description;
        var pdFeature = specInfo[0].features;
        var pdSpe = specInfo[0].specifications;
        pdFeature = utility.strToObj(pdFeature);
    
        pdSpe = utility.strToObj(pdSpe);

        console.log(pdInformation);
        console.log(pdDescription);
        console.log(pdFeature);
        console.log(pdSpe);
       
        res.render('pdinfo',{pdGenerInfo:pdGenerInfo[0],
            pdInformation:pdInformation,
            pdDescription:pdDescription,
            pdFeature:pdFeature,
            pdSpe:pdSpe
        });
      
      });
  });
});

module.exports = router;