<!--
 * @Descripttion: 
 * @version: 
 * @Author: wqq
 * @Date: 2020-06-18 15:06:43
 * @LastEditors: wqq
 * @LastEditTime: 2020-06-30 12:03:31
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
        <el-button @click="download" type="primary">下载测试</el-button>
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
import axios from "axios";
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
    },
    download() {
      axios.defaults.withCredentials = true; //携带cookie,默认不携带
      const service = axios.create({
        baseURL: "http://192.168.5.15:8007",
        port: "8007",
        timeout: 5 * 1000
      });

      service({
        url: "/api/blog/download",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=utf-8"
        },
        method: "get"
      }).then(
        res => {
          const filename = "test";
          let data = res.data.data;
          const blob = new Blob([data], { type: "application/octet-stream" });
          if (typeof window.navigator.msSaveBlob !== "undefined") {
            // 兼容IE，window.navigator.msSaveBlob：以本地方式保存文件
            window.navigator.msSaveBlob(blob, decodeURI(filename));
          } else {
            // 创建新的URL并指向File对象或者Blob对象的地址
            const blobURL = window.URL.createObjectURL(blob);
            // 创建a标签，用于跳转至下载链接
            const tempLink = document.createElement("a");
            tempLink.style.display = "none";
            tempLink.href = blobURL;
            tempLink.setAttribute("download", decodeURI(filename));
            // 兼容：某些浏览器不支持HTML5的download属性
            if (typeof tempLink.download === "undefined") {
              tempLink.setAttribute("target", "_blank");
            }
            // 挂载a标签
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
            // 释放blob URL地址
            window.URL.revokeObjectURL(blobURL);
          }
        },
        err => {}
      );
      // this.$http.get('/api/blog/download').then(res=>{},err=>{})
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