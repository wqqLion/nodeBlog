/*
 * @Descripttion: 
 * @version: 
 * @Author: wqq
 * @Date: 2020-06-18 15:14:27
 * @LastEditors: wqq
 * @LastEditTime: 2020-06-19 09:36:44
 */ 
import Vue from 'vue'
import Router from 'vue-router'

import Login from '../views/login.vue'

Vue.use(Router)
export default new Router({
  mode: 'hash',
  routes:[{
    name:'login',
    path:'/login',
    component:Login
  }]
})