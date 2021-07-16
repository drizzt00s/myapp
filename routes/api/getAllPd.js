var express = require('express');
var utility = require("../../public/javascripts/utility");
var db_config = require("../db/db_config");
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send({
        code:1,
        data:{gpdLists:global.gpdLists,
            subGpdLists:global.subGpdLists,
            lvsubGpdLists3:global.lvsubGpdLists3
        }
    });

});

module.exports = router;