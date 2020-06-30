/*
 * @Descripttion: 
 * @version: 
 * @Author: wqq
 * @Date: 2020-06-22 10:11:26
 * @LastEditors: wqq
 * @LastEditTime: 2020-06-24 17:03:46
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
  //增加阅读量
  addView(id){
    let sql = `update tb_blogs set tb_blogs.readVolume = tb_blogs.readVolume + 1  where id = ${id}`;
    return exec(sql).then(data=>{
      return data;
    })
  }
  // 新增博客
  addArticle(title, content, link, authorId, markdown, type, tags) {
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
    return exec(sql).then(res => {
      return {
        id: res.insertId
      }
    })

  }
  //更新博客
  updateArticle(options) {
    let type = escape(options.type),
      content = escape(options.content),
      title = escape(options.title),
      markdown = escape(options.markdown);
    let link = escape(options.link);
    
    let sql = `update tb_blogs set 
    title = ${title},
    content = ${content},
    type=${type},
    link=${link},
    markdown = ${markdown} where id = ${options.id} limit 1;
    `;
    return exec(sql).then(res => {
      return res;
      // if (res.affectedRows > 0) {
      //   return res;
      // }
      // return false
    })

  }
  //删除
  deleteArticle(id){
    let sql = `delete from tb_blogs where id = ${id} `;
    return exec(sql).then(res=>{
      return res;
    })
  }
  //获取列表
  getBlogList(author, keyword, userId, page) {
    // and
    // tb_blogs.isShow=1
    let sql = `select SQL_CALC_FOUND_ROWS *,tb_blogs.id as articleId 
    from tb_blogs,tb_users 
    where tb_blogs.authorId=tb_users.id`;
    if (author) {
      author = mysql.escape(author);
      sql += `and author=${author}`;
    }
    if (keyword) {
      keyword = mysql.escape(keyword);
      sql += `and title linke %${keyword}%`;
    }
    if(userId){
      sql += ` and authorId = ${userId} `;
    }
    sql += ` order by tb_blogs.createTime desc limit ${page},10;`
    return exec(sql).then(res => {
      return exec(`SELECT FOUND_ROWS()`).then(res2 => {
        res.total = res2[0]['FOUND_ROWS()'];
        return res;
      })
    });
  }
  readArticle(id) {
    let sql = `select * ,tb_blogs.id as articleId   from tb_blogs,tb_users  where tb_blogs.authorId=tb_users.id and tb_blogs.id = ${id}`;
    return exec(sql).then(res => {
      return res;
    })
  }
}
module.exports = blog