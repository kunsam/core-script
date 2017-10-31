
const fs = require('fs-extra')
const path = require('path')

import configStr from '../init.core.config'
import config from '../config'


fs.writeFileSync(path.join(config.basePath, 'core.config.js'), configStr)
console.log('>>> 初始化成功！');