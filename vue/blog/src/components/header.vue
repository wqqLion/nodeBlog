<!--
 * @Descripttion: 
 * @version: 
 * @Author: wqq
 * @Date: 2020-06-18 15:06:43
 * @LastEditors: wqq
 * @LastEditTime: 2020-06-19 14:58:28
--> 
<template>
  <header class="header bx">
    <el-row>
      <el-col class="blog-loo" :span="4">Blog</el-col>
      <el-col class="header-item" :span="2">关于作者</el-col>
      <el-col :class="$route.path =='/'?'active':''" class="header-item" :span="2">推荐</el-col>
      <el-col class="header-item" :span="2">我的</el-col>
      <el-col class="header-search" :span="5">
        <el-input placeholder="搜索文章或关键字" v-model="searchValue" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col class="header-message" :span="3">
        <el-badge :value="200" :max="99" class="item">
          <span class="el-icon-message"></span>
        </el-badge>
      </el-col>
      <el-col class="header-btns" :span="6">
        <el-button @click="loginHandle" type="primary">我要登录</el-button>
        <el-button @click="regionHandle" type="primary">我要注册</el-button>
      </el-col>
    </el-row>
    <Login @hide="hideDialog" :dialogVisible="loginDialog"></Login>
    <Region @hide="hideDialog" :dialogVisible="regionDialog"></Region>
  </header>
</template>

<script type="text/javascript">
import Login from './login'
import Region from './region'
export default {
  data() {
    return {
      userName:sessionStorage.getItem('userName'),
      searchValue:'',
      loginDialog:false,
      regionDialog:false
    };
  },
  components: {
    Login,
    Region
  },
  methods: {
    hideDialog(key){
      this[key] = false;
    },
    loginHandle(){
      this.loginDialog = true;
    },
    regionHandle(){
      this.regionDialog = true;
    }
  },
  mounted() {
    // console.log(this.$route.path)
  }
};
</script>

<style lang="less" scoped>
.header {
  height: 70px;
  border-top: 3px solid #009a61;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1), 0 1px rgba(0, 0, 0, 0.1);
  .blog-loo {
    font-size: 30px;
    line-height: 70px;
    text-align: center;
  }
  .header-item {
    font-size: 20px;
    line-height: 70px;
    text-align: center;
    cursor: pointer;
  }
  .header-search {
    line-height: 70px;
  }
  .header-btns {
    text-align: right;
    line-height: 70px;
    padding-right: 20px;
  }
  .active{
    color: #009a61;
    font-weight: bold;
  }
  .header-message {
    line-height: 70px;
    text-align: center;
    span {
      font-size: 30px;
    }
    .el-badge__content {
      top: 15px !important;
    }
  }
}
</style>
<style lang="less">
.header-message {
  .el-badge__content {
    top: 15px !important;
  }
}
</style>