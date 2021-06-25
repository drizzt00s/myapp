var express = require('express');
var utility = require("../../public/javascripts/utility");
var db_config = require("../db/db_config");


// const imagemin = require('imagemin')
// const imageminPngquant = require('imagemin-pngquant')
// const imageminMozjpeg = require('imagemin-mozjpeg')

// async () => {
//   const files = await imagemin(['images/*.{jpg,png}'], {
//     destination: 'build/images',
//     plugins: [
//       imageminJpegtran(),
//       imageminPngquant({
//         quality: [0.6, 0.8]
//       })
//     ]
//   })
// }



var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
var userData = req.session.userData;
if(!userData){
    var loginInfo = "Sign in";
    var isDisplayed = "show";
    var action = "/login";
}else{
    var loginInfo = userData.account;
    var isDisplayed = "hide";
    var action = "/my_dashboard";
}


res.render('index', {gpdLists:global.gpdLists,
            subGpdLists:global.subGpdLists,
            lvsubGpdLists3:global.lvsubGpdLists3,
            loginInfo:loginInfo,
            isDisplayed:isDisplayed,
            action:action,
            lvsubGpdLists3_abbr:global.lvsubGpdLists3_abbr
    });
});

module.exports = router;
