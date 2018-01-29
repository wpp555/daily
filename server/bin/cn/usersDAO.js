
var mongoose = require('./db.js');

var userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    time:String,
    avatar:String,
    info:String
})
var userDAO = mongoose.model("users",userSchema);

module.exports = userDAO; 