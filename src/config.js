
import path from 'path'

var shell = require('shelljs')

const packJson = require('../package.json')
// 以下路径配置是相对与项目根路径的配置

export default {
  version: packJson.version,
  // 命令行执行路径
  basePath: shell.pwd().stdout,
  
  pkgBasePath: path.join(__dirname, '../'), // path.dirname(module.id)
  
}