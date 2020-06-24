/*
 * @Descripttion: 
 * @version: 
 * @Author: wqq
 * @Date: 2020-06-18 11:10:16
 * @LastEditors: wqq
 * @LastEditTime: 2020-06-23 17:23:42
 */
var express = require('express');
var router = express.Router();

const {
  regino,
  login,
  userInfo,
  userCheck
} = require('../controller/userController');

const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')
//注册
router.post('/region', function (req, res, next) {
  const {
    userName,
    password
  } = req.body;
  if (userName === '' || userName === undefined || userName === null) {
    res.json(new ErrorModel('用户名不能为空'));
  }
  if (password === '' || password === undefined || password === null) {
    res.json(new ErrorModel('密码不能为空'));
  }
  if (userName.length > 20) {
    res.json(new ErrorModel('用户名长度最大为20'));
  }
  const isExist = userInfo(userName);
  if (isExist.id) {
    res.json('用户名已存在');
    return;
  }

  const checkResult = userCheck(userName);
  checkResult.then(data => {
    if (data.length > 0) {
      res.json({
        code: 201,
        message: '用户名已存在'
      })
    } else {
      const reResult = regino(userName, password);
      reResult.then(data=>{
        res.json({
          code:200,
          message:'注册成功'
        });
      })
    }
  })
})
// 登录
router.post('/login', function (req, res, next) {
  const {
    userName,
    password
  } = req.body;
  if (userName === '' || userName === undefined || userName === null) {
    res.json(new ErrorModel('用户名不能为空'));
  }
  if (password === '' || password === undefined || password === null) {
    res.json(new ErrorModel('密码不能为空'));
  }

  const result = login(userName, password);
  return result.then(data => {
    if (data.userName) {
      req.session.userName = data.userName;
      console.log(req.session.userName)
      res.json({
        code: 200,
        id: data.id,
        userName: data.userName
      });
    } else {
      res.json(new ErrorModel('用户不存在'));
    }
  })
})
//验证是否登录
router.get('/loginCheck', function (req, res, next) {
  console.log('---------------------------------------------------------')
  console.log(req.session.userName)
  if (req.session.userName) {
    const result = userInfo(req.session.userName);
    return result.then(data => {
      data.isLogin = true;
      res.json(
        new SuccessModel(data)
      )
    })
  }
  res.json(new ErrorModel('未登录'));

})



module.exports = router;