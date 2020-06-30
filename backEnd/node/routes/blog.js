/*
 * @Descripttion: 
 * @version: 
 * @Author: wqq
 * @Date: 2020-06-18 11:10:22
 * @LastEditors: wqq
 * @LastEditTime: 2020-06-30 14:21:34
 */
var express = require('express');
var router = express.Router();

const loginCheck = require('../model/loginCheck')

const Blog = require('../controller/blogControler')


const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel');

const handleFiles = require('../utils/download')

const multer = require('multer')
const fs = require('fs')
const path = require('path');
const {
  http
} = require('../utils/logger');

const blog = new Blog();
//博客带图片是图片上传
router.post('/blogImg', multer({
  dest: 'upload'
}).single('file'), function (req, res, next) {
  console.log(req)
  if (req.file.length === 0) {
    res.json({
      code: 203,
      message: '上传文件不能为空'
    })
    return;
  } else {
    let file = req.file;
    let fileInfo = {};
    let fileList = file.originalname.split('.');
    let ext = fileList[fileList.length - 1];
    let times = new Date();
    times = times.getTime();
    let newName = `${times}.${ext}`;
    fileList.pop();
    newName = fileList.join('.') + newName;
    fs.renameSync('./upload/' + file.filename, './upload/' + newName); //这里修改文件名字，比较随意。
    // 获取文件信息
    fileInfo.mimetype = file.mimetype;
    fileInfo.originalname = file.originalname;
    fileInfo.size = file.size;
    fileInfo.path = file.path;
    console.log(req)
    // 设置响应类型及编码
    res.set({
      'content-type': 'application/json; charset=utf-8'
    });
    res.json({
      code: 200,
      data: {
        url: 'http://' + req.headers.host + '/upload/' + newName
      }
    })
  }
})
//获取推荐列表
router.get('/list', (req, res, next) => {
  let author = req.query.author || '';
  let keyWord = req.query.keyWord || '';
  let userId = req.query.userId;
  let page = req.query.page || 0;
  const result = blog.getBlogList(author, keyWord, userId, page);
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
      code: 200,
      data: data,
      total: data.total
    })
  })
})
//获取文章详情
router.get('/articleDetail', (req, res, next) => {
  let id = req.query.id;
  const result = blog.readArticle(id);
  return result.then(data => {
    if (data.length > 0) {
      let resData = data[0];
      delete resData['password'];
      res.json({
        code: 200,
        data: resData
      })
    } else {
      res.json({
        code: 201,
        message: '未查询到相关数据'
      })
    }

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
    data.code = 200;
    res.json({
      code: 200,
      data: data
    })
  }).catch(err => {
    res.json({
      code: 201,
      message: err.message
    })
  })

})

router.put('/updateArticle', loginCheck, (req, res, next) => {

  let params = req.body;
  if (params.articleId == '') {
    res.json({
      code: 203,
      message: '文章id不能为空'
    })
  }
  const result = blog.updateArticle(params);
  return result.then(data => {
    if (data.affectedRows == 1) {
      res.json({
        code: 200,
        message: '编辑成功',
      })
    } else {
      res.json({
        code: 203,
        message: '失败'
      })
    }
  })
})

router.delete('/deleteArticle', loginCheck, (req, res, next) => {
  const result = blog.deleteArticle(req.query.id);
  result.then(data => {
    if (data.affectedRows == 1) {
      res.json({
        code: 200,
        message: '删除成功'
      })
      return;
    }
    res.json({
      code: 200,
      message: data.message
    })
  })
})

router.put('/addView', (req, res, next) => {
  const result = blog.addView(req.body.id);
  result.then(data => {
    if (data.affectedRows == 1) {
      res.json({
        code: 200,
        message: '成功',
      })
    } else {
      res.json({
        code: 203,
        message: '失败'
      })
    }
  })
})
// 下载测试
router.get('/download', (req, res, next) => {

  let fileName = 'text.txt';
  let filePath = path.join('./download/', fileName);
  let stats = fs.statSync(filePath);
  if (stats.isFile()) {
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': 'attachment; filename=' + fileName,
      'Content-Length': stats.size
    })
    fs.createReadStream(filePath).pipe(res);
  }else{
    res.end(404)
  }
  // let fileName = req.query.name || 'text';
  // let currFile = 'http://192.168.5.15:8007/download/text.txt';
  // let result = handleFiles(currFile);
  // let binaryFiles = result.then(data=>{
  //   res.json({
  //     data:data,
  //     code:200
  //   })
  //   console.log(data)
  //   return data;
  // })
  // console.log(binaryFiles)
  // res.json({})
  return
  httpf.get(currFile, res => {
    res.setEncoding('binary') // 二进制
    let files = ''
    res.on('data', chunk => { // 加载到内存
      files += chunk
    }).on('end', () => { // 加载完
      // console.log(files)
      // res.json({
      //   data: files
      // })
    }).on('error', (err) => {
      console.log('error-------------------------')
      console.log(err)
    })
  })
  return false;
  fs.exists(currFile, exist => {
    if (exist) {
      // res.set({
      //   "Content-type": "application/octet-stream",
      //   "Content-Disposition": "attachment;filename=" + encodeURI(fileName)
      // })
      let files = ''
      fReadStream = fs.createReadStream(currFile);
      fReadStream.setEncoding('binary');
      fReadStream.on("data", (chunk) => {
        files += chunk;
        // res.write(chunk, "binary")
      });
      fReadStream.on('error', () => {})
      fReadStream.on('end', () => {
        res.json({
          code: 200,
          file: files
        })
        // res.json({
        //   test:files
        // })
        // res.end();
      })
    } else {
      res.json({
        code: 203,
        message: '文件不存在'
      })
    }
  })

})
module.exports = router;