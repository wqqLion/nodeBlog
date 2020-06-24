<!--
 * @Descripttion: 
 * @version: 
 * @Author: wqq
 * @Date: 2020-06-23 14:52:24
 * @LastEditors: wqq
 * @LastEditTime: 2020-06-24 16:19:15
--> 
<template>
  <div class style="height:100%">
    <div class="acricle-detail scrollbar">
      <el-scrollbar style="height:100%;width:100%">
        <div class="article-title">{{article.title}}</div>
        <div class="article-info">
          <el-row>
            <el-col :span="16">
              <el-tag v-if="article.type==1">原创</el-tag>
              <el-tag @click="goLink(article.link)" class="link-tag" v-else>转载{{article.link}}</el-tag>
              <el-tag type="info">{{article.userName}}</el-tag>
              <el-tag type="success">{{article.readVolume}}浏览</el-tag>
              <span style="margin-left:10px;color:#bbb">{{article.createTime}}</span>
            </el-col>
            <el-col v-if="article.authorId==id" :span="8" style="text-align:right">
              <el-button @click="editArticle(article.articleId)" type="primary">编辑</el-button>
              <el-button @click="deleteArticle(article.articleId)" type="danger">删除</el-button>
            </el-col>
          </el-row>
        </div>
        <div style="margin-top:50px" v-html="article.content"></div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      article: {},
      id: sessionStorage.getItem("id")
    };
  },
  components: {},
  methods: {
    goLink(url){
        window.open(url);
    },
    editArticle(id) {
      this.$router.push({
        path: "/writeBlog",
        query: { id: id }
      });
    },
    deleteArticle(id) {
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.delete("/api/blog/deleteArticle", { id: id }).then(
            res => {
              console.log(res);
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              setTimeout(() => {
                this.$router.back(-1);
              }, 1666);
            },
            data => {}
          );
          // sessionStorage.removeItem("userName");
          // sessionStorage.removeItem("id");
          // this.userName = '';
          // this.checkLogin();
        })
        .catch(() => {});
    }
  },
  mounted() {
    //获取文章详情
    this.$http
      .get("/api/blog/articleDetail", { id: this.$route.query.id })
      .then(
        res => {
          this.article = res.data;
          console.log(res.data);
        },
        err => {}
      );
  }
};
</script>

<style lang="less" scoped>
.acricle-detail {
  height: 100%;
  width: 50%;
  margin: 0 auto;
}

.article-title {
  font-size: 30px;
  line-height: 50px;
  border-left: 8px solid #5cb85c;
  margin-top: 20px;
  margin-bottom: 20px;
  text-indent: 10px;
}
.link-tag{
  overflow: hidden;
  max-width: 100px;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  position: relative;
  top: 12px;
}
</style>
