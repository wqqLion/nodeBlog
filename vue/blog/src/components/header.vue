<!--
 * @Descripttion: 
 * @version: 
 * @Author: wqq
 * @Date: 2020-06-18 15:06:43
 * @LastEditors: wqq
 * @LastEditTime: 2020-06-24 12:17:22
--> 
<template>
  <header class="header bx">
    <el-row>
      <el-col class="blog-loo" :span="4">
        <div @click="routerClick">Blog</div>
      </el-col>
      <el-col class="header-item" :span="2">
        <div @click="routerClick">关于作者</div>
      </el-col>
      <el-col :class="$route.path =='/recommendList'?'active':''" class="header-item" :span="2">
        <div @click="routerClick('/recommendList')">推荐</div>
      </el-col>
      <el-col :class="$route.path =='/myList'?'active':''" class="header-item" :span="2">
        <div @click="routerClick('/myList')">我的</div>
      </el-col>
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
        <el-button v-if="!userName" @click="loginHandle" type="primary">我要登录</el-button>
        <el-button v-if="!userName" @click="regionHandle" type="primary">我要注册</el-button>
        <span class="username" v-if="userName">{{userName}}</span>
        <el-button v-if="userName" @click="writeArticle" type="primary" plain>写文章</el-button>
        <el-button v-if="userName" @click="logOut" type="warning" plain>退出</el-button>
      </el-col>
    </el-row>
    <Login @hide="hideDialog" :dialogVisible="loginDialog"></Login>
    <Region @hide="hideDialog" :dialogVisible="regionDialog"></Region>
  </header>
</template>

<script type="text/javascript">
import Login from "./login";
import Region from "./region";
export default {
  data() {
    return {
      userName: "",
      searchValue: "",
      loginDialog: false,
      regionDialog: false
    };
  },
  components: {
    Login,
    Region
  },
  methods: {
    routerClick(p) {
      this.$router.push({
        path: p
      });
    },
    hideDialog(key, reset) {
      this[key] = false;
      if (reset) {
        this.checkLogin();
      }
    },
    loginHandle() {
      this.loginDialog = true;
    },
    regionHandle() {
      this.regionDialog = true;
    },
    checkLogin() {
      this.userName = sessionStorage.getItem("userName");
      console.log(sessionStorage.getItem("userName"));
    },
    writeArticle() {
      this.$router.push("/writeBlog");
    },
    logOut() {
      this.$confirm("确定退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          sessionStorage.removeItem("userName");
          sessionStorage.removeItem("id");
          this.userName = "";
          this.checkLogin();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.checkLogin();
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
    cursor: pointer;
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
  .active {
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
  .username {
    margin-right: 20px;
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