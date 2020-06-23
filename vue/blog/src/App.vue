<!--
 * @Descripttion: 
 * @version: 
 * @Author: wqq
 * @Date: 2020-06-18 15:06:43
 * @LastEditors: wqq
 * @LastEditTime: 2020-06-22 16:45:29
--> 
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
  },
  mounted() {
  }
  
};
</script>
@import './assets/css/global.less'
<style lang="less" scoped>
  #app{
    height: 100%;
  }
</style>
