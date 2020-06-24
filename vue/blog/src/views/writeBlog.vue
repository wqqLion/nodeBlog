<!--
 * @Descripttion: 
 * @version: 
 * @Author: wqq
 * @Date: 2020-06-22 14:55:23
 * @LastEditors: wqq
 * @LastEditTime: 2020-06-24 16:11:19
--> 
<template>
  <div class style="height:100%">
    <header class="header bx">
      <span @click="goHome" class="blog-loo">Blog</span>
      <el-button @click="saveMarkdown" type="primary">保存</el-button>
      <el-button type="success">发布</el-button>
    </header>
    <div class="atricle-div">
      <div style="height:100%">
        <el-input placeholder="请输入内容" v-model="title" class="input-with-select">
          <el-select style="width:100px" v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="原创" value="1"></el-option>
            <el-option label="转载" value="2"></el-option>
          </el-select>
        </el-input>

        <el-input v-model="link" style="margin-top: 15px;" v-if="select==2" placeholder="请输入原文链接"></el-input>
        <div class="tag-div">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >{{tag}}</el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
            maxlength="4"
          ></el-input>
          <el-button
            v-if="!inputVisible && dynamicTags.length<6"
            class="button-new-tag"
            size="small"
            @click="showInput"
          >+ New Tag</el-button>
        </div>
        <div class="markdown">
          <mavon-editor @imgAdd="$imgAdd" ref="editor" v-model="markdownValue" />
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import axios from "axios";
export default {
  data() {
    return {
      select: "1",
      title: "",
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      markdownValue: "",
      link: "",
      articleId: ""
    };
  },
  components: {},
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },

    IsURL(url) {
      if (url.length > 8) {
        let urlHttps = url.slice(0, 5);
        let urlHttp = url.slice(0, 4);
        if (urlHttps == "https") {
          let https = url.slice(0, 8);
          if (https == "https://") {
            return true;
          } else {
            return false;
          }
        } else if (urlHttp == "http") {
          let http = this.url.slice(0, 7);
          if (http == "http://") {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    saveMarkdown() {
      let markdown = this.$refs.editor.d_value;
      // 获取编译后的 html
      let html = this.$refs.editor.d_render;
      // 添加
      var id = this.$route.query.id;
      if (this.select == 2 && !this.IsURL(this.link)) {
        this.$message({
          type: "warning",
          message: "请输入正确的网址"
        });
        return false;
      }
      if (this.title == "") {
        this.$message({
          type: "warning",
          message: "标题不能为空"
        });
        return false;
      }
      if (id) {
        this.$http
          .put("/api/blog/updateArticle", {
            title: this.title,
            content: html,
            link: this.link,
            authorId: sessionStorage.getItem("id"),
            markdown: markdown,
            type: this.select,
            tags: this.dynamicTags.join(","),
            link: this.link,
            id: id
          })
          .then(
            res => {
              this.$message({
                type: "success",
                message: "保存成功"
              });
            },
            err => {}
          );
      } else {
        this.$http
          .post("/api/blog/addArticle", {
            title: this.title,
            content: html,
            link: this.link,
            authorId: sessionStorage.getItem("id"),
            markdown: markdown,
            type: this.select,
            tags: this.dynamicTags.join(","),
            link: this.link
          })
          .then(res => {
            console.log(res);
            this.$message({
              type: "success",
              message: "保存成功"
            });
          })
          .catch(err => {});
      }
    },
    goHome() {
      this.$router.push("/");
    },
    $imgAdd(pos, $file) {
      var formdata = new FormData();
      formdata.append("file", $file);
      
      const service = axios.create({
        baseURL: "http://192.168.5.15:8007",
        port: "8007",
        timeout: 5 * 1000
      });

      service({ url: "/api/blog/blogImg", 
      headers: { "Content-Type": "multipart/form-data" },
      method: "post",data:formdata }).then(res=>{
         this.$refs.editor.$img2Url(pos, res.data.data.url);
      },err=>{

      })
      
      // axios.create({
      //   url: "http://192.168.5.15:8006/api/blog/blogImg",
      //   port: "8006",
      //   timeout: 5 * 1000,
      //   headers: { "Content-Type": "multipart/form-data" },
      //   data: formdata,
      //   method:post
      // });
      // console.log(formdata)
      // this.$http.post('/api/blog/blogImg',formdata,{ "Content-Type": "multipart/form-data" }).then(res=>{

      // })
    }
  },
  mounted() {
    //获取文章详情
    if (this.$route.query.id) {
      this.$http
        .get("/api/blog/articleDetail", { id: this.$route.query.id })
        .then(
          res => {
            let article = res.data;
            this.title = article.title;
            this.select = article.type;
            this.markdownValue = article.markdown;
            this.articleId = article.articleId;
            this.dynamicTags =
              article.tags == "" ? [] : article.tags.split(",");
            this.link = article.link;
            console.log(res.data);
          },
          err => {}
        );
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  height: 70px;
  line-height: 70px;
  text-align: right;
  padding-right: 20px;
  border-top: 3px solid #009a61;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1), 0 1px rgba(0, 0, 0, 0.1);
}
.atricle-div {
  width: 80%;
  height: calc(100% - 85px);
  margin: 0 auto;
  padding-top: 15px;
}
.tag-div {
  padding: 15px 0;
}

.markdown {
  height: calc(100% - 160px);
}
.blog-loo {
  font-size: 30px;
  line-height: 70px;
  text-align: center;
  float: left;
  margin-left: 10%;
  cursor: pointer;
}
</style>
<style lang="less">
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px !important;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px !important;
  margin-left: 10px !important;
  vertical-align: bottom;
}
.v-note-wrapper.shadow {
  height: 100%;
}
</style>