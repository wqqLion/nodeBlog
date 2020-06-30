/*
 * @Descripttion: 
 * @version: 
 * @Author: wqq
 * @Date: 2020-06-30 11:52:44
 * @LastEditors: wqq
 * @LastEditTime: 2020-06-30 11:58:18
 */ 
const http = require('http')
function handleFiles(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      res.setEncoding('binary') // 二进制
      let files = ''
      res.on('data', chunk => { // 加载到内存
        files += chunk
      }).on('end', () => { // 加载完
        resolve(files)
      })
    })
  })
}

module.exports = handleFiles