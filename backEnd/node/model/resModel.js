/*
 * @Descripttion: 
 * @version: 
 * @Author: wqq
 * @Date: 2020-06-18 14:21:53
 * @LastEditors: wqq
 * @LastEditTime: 2020-06-22 09:15:41
 */ 
class BaseModel{
  constructor(data,message){
    if(typeof data === 'string'){
      this.message = data;
      data=null;
      message=null;
    }
    if(data){
      this.data = data;
    }
    if(message){
      this.message = message;
    }
  }
}

class SuccessModel extends BaseModel{
 constructor(data,message){
   super(data,message);
   this.code=200;
 } 
}

class ErrorModel extends BaseModel{
  constructor(data,message){
    super(data,message);
    this.code = 203;
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}