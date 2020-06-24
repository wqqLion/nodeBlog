/*
 * @Descripttion: 文件上传
 * @version: 
 * @Author: wqq
 * @Date: 2020-06-24 14:27:01
 * @LastEditors: wqq
 * @LastEditTime: 2020-06-24 14:30:44
 */ 
const multer = require('multer')

var storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'./public/userImg')
  },
  filename:function(req,file,cb){
    let fileList = file.originalname.split('.');
    let ext = fileList[fileList.length-1];
    let times = new Date();
    times = times.getTime();
    let newName = `${times}.${ext}`;
    cb(null,newName);
  }
})

module.exports = multer({storage});