/*
 * @Descripttion: 
 * @version: 
 * @Author: wqq
 * @Date: 2020-06-18 15:18:27
 * @LastEditors: wqq
 * @LastEditTime: 2020-06-24 16:27:19
 */ 
import axios from "axios";
import qs from 'qs'
import {Message} from 'element-ui';

axios.defaults.withCredentials=true;//携带cookie,默认不携带
// 创建新的axios实例
const service = axios.create({
  baseURL:'http://192.168.5.15:8007',
  port:'8007',
  timeout:5*1000
})


// 请求拦截器

service.interceptors.request.use(config=>{
  config.data = qs.stringify(config.data);
  if(config.header){
    config.headers = config.header;
  }else{
    config.headers = {
      'Content-Type':'application/x-www-form-urlencoded'
    }
  }
  
  return config
},error=>{
  Promise.reject(error);
})

// 响应拦截器
service.interceptors.response.use(response=>{
  if(response.data.code == 200){
    return response.data;
  }else{
    return Promise.reject(response.data);
  }
},error=>{
  Message.error({
    type:'error',
    message:error.Message || '错误'
  });
  return Promise.reject(error.response);
})
export default service