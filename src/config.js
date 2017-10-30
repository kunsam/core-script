
import path from 'path'

const packJson = require('../package.json')
// 以下路径配置是相对与项目根路径的配置

export default {
  version: packJson.version,

  // 命令行执行路径
  basePath: process.cwd(),
  
  pkgBasePath: path.dirname(module.id),

  xmind: {
    ui: {
      path: 'xmind/ui',
      // output: 'xmind/ui' // 不配置的话默认同xmind读取路径
    }
  }
}