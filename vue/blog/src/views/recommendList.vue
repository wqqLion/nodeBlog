<!--
 * @Descripttion: 
 * @version: 
 * @Author: wqq
 * @Date: 2020-06-22 16:42:55
 * @LastEditors: wqq
 * @LastEditTime: 2020-06-23 14:22:51
--> 
<template>
  <div class="article-div">
    <div class="card bx" v-for="item in blogs" :key="item.articleId">
      <div class="card-left">
        <div style="height:calc(100% - 60px)">
          <el-image fit="fill" :src="src"></el-image>
        </div>
        <div style="margin-top:10px">
          <div class="left-item">创建时间：{{item.createTime}}</div>
          <div class="left-item">有人{{item.readVolume}}阅读</div>
        </div>
      </div>
      <div class="card-right bx">
        <div class="article-titie">{{item.title}}</div>
        <div class="author-inof">
          <span>
            <i class="el-icon-user"></i>
            {{item.userName}}
          </span>
          <!-- <span>
            <i class="el-icon-star-off"></i>
            程序员
          </span>-->
        </div>
        <div class="markdown-div">{{item.markdown}}</div>
        <div class="tags">
          <el-tag v-for="(tag,index) in item.tags" :key="index" type="success">{{tag}}</el-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      src: require("../static/images/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"),
      blogs: []
    };
  },
  components: {},
  methods: {},
  mounted() {
    this.$http.get("/api/blog/list").then(
      res => {
        this.blogs = res.data;
      },
      err => {}
    );
  }
};
</script>

<style lang="less" scoped>
.article-div {
  height: 100%;
  margin: 0;
}
.card {
  display: inline-block;
  width: 50%;
  height: 300px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  margin-top: 50px;
  margin-left: 25%;
  padding: 20px;
  cursor: pointer;
  .card-left {
    width: 50%;
    height: 100%;
    float: left;
    .left-item {
      height: 30px;
      line-height: 30px;
      color: #626262;
      font-size: 14px;
    }
  }
  .card-right {
    float: left;
    width: 50%;
    height: 100%;
    padding-left: 50px;
    position: relative;
    .article-titie {
      font-size: 20px;
      color: #000000;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .author-inof {
      color: #38ba72;
      margin-top: 10px;
      height: 20px;
      line-height: 20px;
      span {
        display: inline-block;
        line-height: 20px;
        font-size: 16px;
      }
      span:first-child {
        padding-right: 5px;
        margin-right: 5px;
        border-right: 2px solid #38ba72;
      }
    }
    .tags {
      position: absolute;
      height: 50px;
      width: 100%;
      left: 20px;
      padding-left: 30px;
      bottom: 0;
    }
  }
  .markdown-div {
    height: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
}
.card:hover {
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1), 0 1px rgba(0, 0, 0, 0.1);
}
</style>
<style lang="less">
.el-image {
  height: 100%;
  width: 100%;
}
</style>