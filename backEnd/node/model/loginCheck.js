/*
 * @Descripttion: 
 * @version: 
 * @Author: wqq
 * @Date: 2020-06-23 17:25:13
 * @LastEditors: wqq
 * @LastEditTime: 2020-06-23 17:27:21
 */ 
module.exports=(req,res,next)=>{
  next();
    return;
  if(req.session.userName){
    next();
    return;
  }
  res.json({
    code:201,
    message:'未登录'
  })
}