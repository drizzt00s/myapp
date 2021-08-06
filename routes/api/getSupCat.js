var express = require('express');
var utility = require("../../public/javascripts/utility");
var db_config = require("../db/db_config");
var router = express.Router();

router.get("/", function(req, res, next){
    const supCatId = req.body.supCatId;
    //产品最大分类id

    const gpdLists = global.gpdLists;
    const subGpdLists = global.subGpdLists;

    res.send({
        gpdLists:gpdLists,
        subGpdLists:subGpdLists
    });



});

module.exports = router;