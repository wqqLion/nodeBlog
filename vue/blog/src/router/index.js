/*
 * @Descripttion: 
 * @version: 
 * @Author: wqq
 * @Date: 2020-06-18 15:14:27
 * @LastEditors: wqq
 * @LastEditTime: 2020-06-23 10:51:08
 */
import Vue from 'vue'
import Router from 'vue-router'


import Main from '../views/main.vue'

import recommendList from '../views/recommendList'



import WriteBlog from '../views/writeBlog'


Vue.use(Router)
export default new Router({
  mode: 'hash',
  routes: [{
    name:'writeBlog',
    path:'/writeBlog',
    component:WriteBlog
  },{
    name:'main',
    path:'/',
    component:Main,
    redirect:'/recommendList',
    children:[{
      name:'recommendList',
      path:'/recommendList',
      component:recommendList
    }]
  }]
})