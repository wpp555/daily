var mongoose = require('./db.js');

var cataSchema = new mongoose.Schema({
    userID:String,
    list1:String,
    list2:String,
    list3:String,
    list4:String,
    list5:String,
    list6:String,
    list7:String,
    list8:String,
    list9:String,
    list10:Object
})
var cataDAO = mongoose.model("catas",cataSchema);

module.exports = cataDAO; 