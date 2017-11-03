
const fs = require('fs-extra')
const path = require('path')

import configStr from '../init.core.config'
import { PROJECT_BASE_PATH } from '../src.config'

const configFilePath = path.join(PROJECT_BASE_PATH, '.core-config/core.config.js')
if (!fs.existsSync(configFilePath)) {
  fs.writeFileSync(configFilePath, configStr)
  console.log('>>> 初始化成功！')
} else {
  console.log('>>> 配置文件已存在！')
}
