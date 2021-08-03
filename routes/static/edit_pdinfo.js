var express = require('express');
var utility = require("../../public/javascripts/utility");
var db_config = require("../db/db_config");
var router = express.Router();

router.get('/', function(req, res, next) {

    if(!(req.session.adminData)){
        res.redirect("/admin_login");
        return false;
    }
    var adminAcc = req.session.adminData.account;
    const pid = req.query.pid;
    const pdIndex = (pid + '') - 1;
    const pdInGeneralFo = global.lvsubGpdLists3.slice(pdIndex, pdIndex + 1);

    let pdSpc = global.pdSpec.slice(pdIndex, 1);

    const description = pdSpc[0].description;
    let features = pdSpc.features;
    //array
    const product_infomation = pdSpc[0].product_infomation;
    let specifications = pdSpc.specifications;
    //array

    console.log(description)
    console.log(product_infomation)
    res.render('editSpePd',{
        // pdInGeneralFo:pdInGeneralFo,
        description:description,
        product_infomation:product_infomation
        // features:features,
        // specifications:specifications
    });
    // res.render('editSpePd');


});

module.exports = router;