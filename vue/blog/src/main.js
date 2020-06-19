/*
 * @Descripttion: 
 * @version: 
 * @Author: wqq
 * @Date: 2020-06-18 15:06:43
 * @LastEditors: wqq
 * @LastEditTime: 2020-06-18 17:42:02
 */ 
import Vue from 'vue'

import router from './router';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import http from './utils/http.js';
// import axios from 'axios';

// Vue.prototype.$axios = axios;
Vue.prototype.$http = http;

import App from './App.vue'

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
