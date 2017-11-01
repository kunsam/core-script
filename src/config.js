
import path from 'path'
var shell = require('shelljs')
// 这个文件要暴露到项目配置中 core.config.js

const packJson = require('../package.json')
// 以下路径配置是相对与项目根路径的配置

export default {
  version: packJson.version,

  // 命令行执行路径
  basePath: shell.pwd().stdout,
  
  pkgBasePath: path.join(__dirname, '../') // path.dirname(module.id)
  
}