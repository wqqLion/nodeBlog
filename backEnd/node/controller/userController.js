/*
 * @Descripttion: 
 * @version: 
 * @Author: wqq
 * @Date: 2020-06-18 11:34:18
 * @LastEditors: wqq
 * @LastEditTime: 2020-06-23 11:56:35
 */
// const {exec,escape} = require('../db/mysql');
const {
  exec,
  escape
} = require('../db/mysql');
const {
  genPassword
} = require('../utils/cryps');
const login = function (userName, password) {
  userName = escape(userName);
  // 生成加密密码
  password = genPassword(password);
  password = escape(password);
  const sql = `select * from tb_users where userName = ${userName} and password = ${password}`;
  return exec(sql).then(rows => {
    return rows[0] || {};
  })

}
const userInfo = function (userName) {
  userName = escape(userName);
  const sql = `select tb_users.id ,userName from tb_users where userName=${userName}`;
  return exec(sql).then(rows => {
    return rows[0] || {};
  })
}
const regino = function (userName, password) {
  userName = escape(userName);
  // 生成加密密码
  password = genPassword(password);
  password = escape(password);
  const sql = `insert into tb_users (userName,password) values (${userName},${password})`;
  return exec(sql).then(rows => {
    return rows[0] || {};
  })
}

const userCheck = function (userName) {
  userName = escape(userName);
  return exec(`select userName from tb_users where userName=${userName}`).then(res => {
    return res;
  })
}

module.exports = {
  login,
  userInfo,
  regino,
  userCheck
}