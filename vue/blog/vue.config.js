/*
 * @Descripttion: 
 * @version: 
 * @Author: wqq
 * @Date: 2020-06-18 16:51:03
 * @LastEditors: wqq
 * @LastEditTime: 2020-06-18 17:32:36
 */
const path = require('path')
module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
  },
  devServer: {
    // open: true, //配置自动启动浏览器
    proxy: {
      "/api": {
        target: "http://192.168.5.15:8006", //后端ip地址及端口
        ws: true, //是否跨域
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};

function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/css/global.less'),
      ],
    })
}