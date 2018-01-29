var mongoose = require('mongoose');
mongoose.Promise = Promise;

var cn = mongoose.connect("mongodb://localhost/daylog",{
    useMongoClient:true
},function(err){
    if(err){
        console.log("数据库连接失败");
    }else{
        console.log("mongodb runing ...");        
    }
});

module.exports = mongoose;