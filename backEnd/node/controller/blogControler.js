/*
 * @Descripttion: 
 * @version: 
 * @Author: wqq
 * @Date: 2020-06-22 10:11:26
 * @LastEditors: wqq
 * @LastEditTime: 2020-06-23 09:48:15
 */
const {
  exec,
  escape
} = require('../db/mysql');
const mysql = require('../db/mysql');

const {
  timestampToTime
} = require('../utils/data')

let blog = class blog {
  // 新增博客
  addArticle(title, content, link, authorId, markdown, type,tags) {
    content = escape(content);
    markdown = escape(markdown);
    title = escape(title);
    link = escape(link);
    tags = escape(tags);
    let createtime = timestampToTime(Date.now());

    let sql = `
    insert into tb_blogs(title, content, link, createtime, authorId, markdown, type,tags)
    values 
    (${title}, ${content}, ${link}, '${createtime}', '${authorId}', ${markdown},'${type}',${tags});
    `;
    return exec(sql).then(res=>{
      return {
        id:res.insertId
      }
    })

  }
  //获取推荐列表
  getBlogList(author, keyword) {
    // and
    // tb_blogs.isShow=1
    let sql = `select *,tb_blogs.id as articleId 
    from tb_blogs,tb_users 
    where tb_blogs.authorId=tb_users.id `;
    if (author) {
      author = mysql.escape(author);
      sql += `and author=${author}`;
    }
    if (keyword) {
      keyword = mysql.escape(keyword);
      sql += `and title linke %${keyword}%`;
    }
    sql += ` order by tb_blogs.createTime desc;`
    return exec(sql).then(res=>{
      return res
    });
  }
}
module.exports = blog