const mongoose = require("mongoose");
// const UserModel = require("./model/user");
(function(){
    mongoose.connect("mongodb://localhost/test");
    mongoose.connection.on("open",function () {
        console.log("mongodb is now connected.")
    }).on("error",function(err){
        console.log("error happens" + err);
    });
})();





// var s = new UserModel({
//     name:"11111s1",weight:100000
// });



// s.save(function () {
//
// })


