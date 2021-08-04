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

    let pdSpc = global.pdSpec.slice(pdIndex, pdIndex + 1);

    let features = JSON.parse(pdSpc[0].features);

    const description = pdSpc[0].description;

    //array
    const product_infomation = pdSpc[0].product_infomation;
    let specifications = JSON.parse(pdSpc[0].specifications);
    //array



    res.render('editSpePd',{
        pdInGeneralFo:pdInGeneralFo[0],
        description:description,
        product_infomation:product_infomation,
        features:features,
        specifications:specifications,
        pid:pid
    });
    // res.render('editSpePd');


});

module.exports = router;