'use strict'
// const rrcPath = require('@rrc/utils/path')()
const path = require('path')
const cwd = process.cwd()

let env_config = {
  development: { // 开发环境
    dist: {
      html: 'dist/index.html' // html 的输出路径
    },
    publicPath: '/'
  },
  sandbox: { // 测试环境
    dist: {
      html: 'dist/index.html' // html 的输出路径
    },
    publicPath: '//busi.rrcimg.com/aftersale-integration-fe/dist/'
  },
  production: { // 线上环境
    dist: {
      html: 'online/index.html' // html 的输出路径
    },
    publicPath: '//busi.rrcimg.com/aftersale-integration-fe/dist/'
  }
}

let config = env_config[process.env.ANNE_APP_CLIENT]

module.exports = {
  materials: {
    template: 'vayne'
  },
  pages: {
    'app': {
      entry: './src/index.js',
      template: './src/index.tpl',
      filename: path.resolve(cwd, config.dist.html), // build生成入口文件index.html位置
    }
  },
  qiniu: {
    // 启用上传服务
    enable: true,
    accessKey: '7XpXEW2l-DUawPpfykszsTFNOr6rwW7peloKUDnT',
    secretKey: '1sMLgliCmIakJUoCVZc1gL6MNyK7w6r9IhBW1XwG',
    exclude: /index\.html$|manifest\.[0-9a-zA-Z]+\.js$/,
    bucket: 'busi-rrccdn',
    path: 'aftersale-integration-fe/dist/'
  },
  port: 8008,
  proxyTable: {
    '/dev': {
      target: 'http://localhost:3000/',
      pathRewrite: {
        '/dev': ''
      }
    },
  },

  publicPath: config.publicPath
  // index: path.resolve(cwd, config.dist.html), // build生成入口文件index.html位置
}
