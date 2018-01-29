

var mongoose = require('./db.js');

var dailySchema = new mongoose.Schema({
    userID:String,
    year:String,
    month:String,
    day:String,
    list1:Number,
    list2:Number,
    list3:Number,
    list4:Number,
    list5:Number,
    list6:Number,
    complete:Number
})
var dailyDAO = mongoose.model("dailys",dailySchema);

module.exports = dailyDAO; 