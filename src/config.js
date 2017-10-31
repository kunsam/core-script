
import path from 'path'

// 这个文件要暴露到项目配置中 core.config.js

const packJson = require('../package.json')
// 以下路径配置是相对与项目根路径的配置

export default {
  version: packJson.version,

  // 命令行执行路径
  basePath: process.cwd(),
  
  pkgBasePath: path.dirname(module.id)
  
}