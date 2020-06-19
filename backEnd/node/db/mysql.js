/*
 * @Descripttion: 
 * @version: 
 * @Author: wqq
 * @Date: 2020-06-18 11:13:40
 * @LastEditors: wqq
 * @LastEditTime: 2020-06-19 17:57:23
 */
const mysql = require('mysql');
const logger = require('../utils/logger')
const MYSQL_CONF = {
  host: '192.168.5.11',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'blog',
};

let con = null;

function handleDisconnection() {
  con = mysql.createConnection(MYSQL_CONF);
  con.connect(function (err) {
    if (err) {
      setTimeout(handleDisconnection, 2000);
    }
  });

  con.on('error', function (err) {
    logger.error('db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      logger.error('db error执行重连:' + err.message);
      handleDisconnection();
    } else {
      throw err;
    }
  });
}

//创建链接对象
// const con = mysql.createConnection(MYSQL_CONF);
// con.connect();
handleDisconnection();
// sql函数
function exec(sql) {
  const promise = new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    })
  })
  return promise;
}

module.exports = {
  con,
  exec,
  escape: mysql.escape
}