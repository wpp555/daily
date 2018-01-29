var express = require('express');
var router = express.Router();
var md5 = require("md5");
// 引入数据库
var usersDAO = require("../bin/cn/usersDAO.js");
// 引入time
var time = require('../bin/libs/time.js');
var isLogin = require('../bin/libs/isLogin.js');

/* 注册用户. */
router.post('/add', function(req, res) {
  if(req.body.yzm.toUpperCase()!==req.session.captcha.toUpperCase()){
    res.json({err:1,msg:"验证码错误"});
    return;
  }
  usersDAO.findOne({username:req.body.username})
  .then(data=>{
    if(data){
      res.json({err:2,msg:"用户名已被占用"});
      return;
    }else{
      usersDAO.findOne({email:req.body.email})
      .then(data=>{
        if(data){
          res.json({err:3,msg:"邮箱已被占用"});
          return;
        }else{
          // 时间戳
          req.body.time = time('time');
          // 加密
          req.body.password = md5(req.body.password);
          var u = usersDAO(req.body);
          u.save()
          .then(function(data){
            res.json({err:0,msg:"注册成功"});
            req.session.user = data;
            delete req.session.user.password;
            delete req.session.captcha;
          })
          .catch(function(){
            res.json({err:4,msg:"数据库插入失败"});
          })
          
        }
      })
    }
  })
  
});

/* 用户登录. */
router.get('/add', function(req, res) {
  req.query.password = md5(req.query.password);
  usersDAO.findOne(req.query,{password:0})
  .then(data=>{
    if(data){
      req.session.user = data
      res.json({err:0,msg:"欢迎  "+data.username});
    }else{
      res.json({err:1,msg:"登录信息错误！"});
    }
  })
  .catch(()=>{
    res.json({err:2,msg:"登录查询错误，稍后再试"});
  })
  
});

/* 退出登录. */
router.get('/exit', function(req, res) {
  delete req.session.user;
  res.json({err:0,msg:"退出成功"});
});

// sssssssssssssssssssssssssss
router.get('/ss', function(req, res) {
  console.log(req.query);
  res.json({err:0,msg:"退出成功"});
});
module.exports = router;
