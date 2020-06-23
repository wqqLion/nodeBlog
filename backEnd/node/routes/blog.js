/*
 * @Descripttion: 
 * @version: 
 * @Author: wqq
 * @Date: 2020-06-18 11:10:22
 * @LastEditors: wqq
 * @LastEditTime: 2020-06-23 14:18:41
 */
var express = require('express');
var router = express.Router();

const loginCheck = require('./user')

const Blog = require('../controller/blogControler')

const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel');

const blog = new Blog();

router.get('/list', (req, res, next) => {
  let author = req.body.author || '';
  let keyWord = req.body.keyWord || '';
  const result = blog.getBlogList(author, keyWord);
  return result.then(data => {
    data.forEach(element => {
      element.tags = element.tags === '' ? [] : element.tags.split(',')
    });
    if (data.length == 0) {
      res.json({
        code: 203,
        message: '未查询到数据'
      })
      return;
    }
    res.json({
      code:200,
      data: data
    })
  })
})

router.post('/addArticle', loginCheck, (req, res, next) => {
  let {
    title,
    content,
    link,
    authorId,
    markdown,
    type,
    tags
  } = req.body;
  const result = blog.addArticle(title, content, link, authorId, markdown, type, tags);
  return result.then(data => {
    data.code=200;
    res.json(
      {
        code:200,
        data:data
      }
    )
  }).catch(err => {
    res.json({
      code:201,
      message:err.message
    })
  })

})


module.exports = router;