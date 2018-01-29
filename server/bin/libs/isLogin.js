
// 判断是否登录
function login(req,res,next){
    if(req.session.user){
        next();
    }else{
        res.json({err:5,msg:'未找到登录信息'});
    }
}

module.exports = login;