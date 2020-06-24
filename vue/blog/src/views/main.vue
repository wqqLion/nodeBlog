<!--
 * @Descripttion: 
 * @version: 
 * @Author: wqq
 * @Date: 2020-06-22 16:38:05
 * @LastEditors: wqq
 * @LastEditTime: 2020-06-23 15:32:13
--> 
<template>
  <div class="" style="height:100%" >
    <Header></Header>
    <router-view style="height:calc(100% - 70px);" ></router-view>
  </div>
</template>

<script type="text/javascript">
import Header from '../components/header'
export default {
  data() {
    return {

    }
  },
  components: {
    Header
  },
  methods: {

  },
  mounted() {

  },
}
</script>

<style lang="less" scoped>
</style>
