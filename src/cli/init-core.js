
const fs = require('fs-extra')
const path = require('path')

import configStr from '../init.core.config'
import config from '../config'

const configFilePath = path.join(config.basePath, '.core-config/core.config.js')
if (!fs.existsSync(configFilePath)) {
  fs.writeFileSync(configFilePath, configStr)
  console.log('>>> 初始化成功！')
} else {
  console.log('>>> 配置文件已存在！')
}
