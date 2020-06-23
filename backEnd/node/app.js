/*
 * @Descripttion: 
 * @version: 
 * @Author: wqq
 * @Date: 2020-06-18 10:23:43
 * @LastEditors: wqq
 * @LastEditTime: 2020-06-22 14:29:44
 */
var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');

const handleLog = require('./utils/morgan')

var app = express();

app.use(handleLog);

app.all('*', function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "http://192.168.5.15:8080");
  //允许的header类型
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  //允许携带cookie
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method.toLowerCase() == 'options') {
    res.send(200); //让options尝试请求快速结束
  } else {
    next();
  }
})


app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser('XHiol#23123_'));


// 使用 session 中间件
app.use(session({
  secret: 'XHiol#23123_',
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  },
}))

app.use('/api/user', userRouter);
app.use('/api/blog', blogRouter);

// error handler
app.use(function(err, req, res, next) {
  console.log(err)
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'dev' ? err : {};
  // // render the error page
  // console.log(err)
  // res.status(err.status || 500);
  // res.render('error');
});



module.exports = app;