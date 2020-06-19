/*
 * @Descripttion: 
 * @version: 
 * @Author: wqq
 * @Date: 2020-06-18 15:18:27
 * @LastEditors: wqq
 * @LastEditTime: 2020-06-19 15:11:02
 */ 
import axios from "axios";
import qs from 'qs'
import {Message} from 'element-ui';

// 创建新的axios实例
const service = axios.create({
  baseURL:'http://192.168.5.15:8006',
  port:'8006',
  timeout:5*1000
})

// 请求拦截器

service.interceptors.request.use(config=>{
  // config.data = JSON.stringify(config.data);
  config.data = qs.stringify(config.data);
  config.headers = {
    'Content-Type':'application/x-www-form-urlencoded'
  }
  return config
},error=>{
  Promise.reject(error);
})

// 响应拦截器
service.interceptors.response.use(response=>{
  return response.data;
},error=>{
  // if(error&&error.response){

  // }else{

  // }
  Message.error({
    type:'error',
    message:error.Message || '错误'
  });
  return Promise.resolve(error.response);
})
export default service