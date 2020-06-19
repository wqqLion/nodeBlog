<!--
 * @Descripttion: 
 * @version: 
 * @Author: wqq
 * @Date: 2020-06-18 15:06:43
 * @LastEditors: wqq
 * @LastEditTime: 2020-06-19 16:19:31
--> 
<template>
  <div id="app">
    <!-- <router-view></router-view> -->
    <myheader></myheader>
  </div>
</template>

<script>
import myheader from './components/header'
export default {
  name: "App",
  components: {
    myheader
  },
  mounted() {
    this.$http.get('/api/user/loginCheck')
   
  }
  
};
</script>
@import './assets/css/global.less'
<style lang="less" scoped>
  #app{
    height: 100%;
  }
</style>
