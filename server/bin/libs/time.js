
// 获取时间
function times(e){
    if(e==='time'){
        var timestamp = Date.parse(new Date());
        return timestamp;
    }
    var now = new Date();
    var year = now.getFullYear();   //年
    var month = now.getMonth()+1;   //月份
    var day = now.getDate();       //日
    month = month<10?('0'+month):month;
    day = day<10?('0'+day):day;
    if(e==='day'){
        return {
            year:year,
            month:month,
            day:day
        }
    }

    var hour = now.getHours();      //时
    var minute = now.getMinutes();  //分

    // 加工

    minute = minute<10?('0'+minute):minute;
    var time = hour>12?(hour-12+':'+minute+'pm'):(hour+':'+minute+'am');
    return year+'-'+month+'-'+day+' '+time;
}

module.exports = times;