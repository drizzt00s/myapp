
const UserModel = require("./model/user");
var s = new UserModel({
    name:"1111211ss1",weight:1001000
});
const mongoose = require("mongoose");
// const UserModel = require("./model/user");

    mongoose.connect("mongodb://localhost/test");
    mongoose.connection.on("open",function () {
        s.save(function () {

        })
    }).on("error",function(err){
        console.log("error happens" + err);
    });






