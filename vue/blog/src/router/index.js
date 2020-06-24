/*
 * @Descripttion: 
 * @version: 
 * @Author: wqq
 * @Date: 2020-06-18 15:14:27
 * @LastEditors: wqq
 * @LastEditTime: 2020-06-24 12:20:38
 */
import Vue from 'vue'
import Router from 'vue-router'


import Main from '../views/main.vue'

import recommendList from '../views/recommendList'

import myList from '../views/myList.vue'
import Detail from '../views/detail.vue'


import WriteBlog from '../views/writeBlog'


Vue.use(Router)
export default new Router({
  mode: 'hash',
  routes: [{
    name: 'writeBlog',
    path: '/writeBlog',
    component: WriteBlog
  }, {
    name: 'main',
    path: '/',
    component: Main,
    redirect: '/recommendList',
    children: [{
      name: 'recommendList',
      path: '/recommendList',
      component: recommendList
    }, {
      name: 'detail',
      path: '/detail',
      component: Detail
    },{
      name:'myList',
      path:'/myList',
      component:myList
    }]
  }]
})