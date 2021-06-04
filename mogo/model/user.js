const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//create schema and model
const UserSchema = new Schema({
    name:String,
    weight:Number
});
const  UserModel = mongoose.model("usr",UserSchema);
module.exports = UserModel;


