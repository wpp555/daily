var express = require('express');
var router = express.Router();
var md5 = require("md5");
// 引入数据库
var usersDAO = require("../bin/cn/usersDAO.js");
var dailyDAO = require("../bin/cn/dailyDAO.js");
var cataDAO = require("../bin/cn/catalogDAO.js");
// 引入time
var time = require('../bin/libs/time.js');
var isLogin = require('../bin/libs/isLogin.js');



/* 日常信息. */
router.get('/day', isLogin)
router.get('/day', function(req, res) {
  // 先查cataDAO表
  cataDAO.findOne({userID:req.session.user._id})
  .then(cData=>{
    if(cData){
      var obj = Object.assign({userID:req.session.user._id},time('day')); 
      dailyDAO.findOne(obj)
      .then(data=>{
        res.json({err:0,msg:"数据库",data:{cData,data}});
      })
      .catch(err=>{
        res.json({err:1,msg:"数据库查询失败"});
      })
    }else{
      res.json({err:1,msg:"您还没有事件，请先新建"});
      return;
    }
  })
  .catch(err=>{
    res.json({err:1,msg:"数据库查询失败"});
  })
});

/* 日常信息. */
router.post('/day', isLogin)
router.post('/day', function(req, res) {
  var obj = Object.assign({userID:req.session.user._id},time('day'));
  dailyDAO.findOne(obj)
  .then(data=>{
    if(data){
      var dd = Object.assign(data,req.body);
      dd.save()
      .then(data=>{
        res.json({err:0,msg:"保存成功"});
      })
      .catch(err=>{
        res.json({err:1,msg:"插入失败"});
      })
    }else{
      var obj = Object.assign({userID:req.session.user._id},time('day'),req.body);   
      var d = dailyDAO(obj);
      d.save()
      .then(data=>{
        res.json({err:0,msg:"签到成功"});
      })
      .catch(err=>{
        res.json({err:1,msg:"插入失败"});
      })
    }
  })
  .catch(err=>{
    res.json({err:1,msg:"数据库查询失败"});
  })
});


// 查看签到选项
router.get('/save', isLogin)
router.get('/save',function(req,res){
  cataDAO.findOne({userID:req.session.user._id})
  .then(data=>{
    res.json({err:0,msg:"正在插入",data:data});
  })
  .catch(err=>{
    res.json({err:1,msg:"数据库查询失败"});
  })
  
})
// 一次性代码
router.post('/save', isLogin)
router.post('/save',function(req,res){
  console.log(req.body);
  var  aaaa = {
    userID:req.session.user._id,
    list10:{
      a:1,
      b:2
    }
  }
  req.body.userID = req.session.user._id;
  var c = cataDAO(aaaa);
  c.save()
  .then(data=>{
    console.log(data);
  })
  .catch(err=>{
    console.log(err)
  })
  res.json({err:0,msg:"正在插入"});
})
module.exports = router;