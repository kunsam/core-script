var fs = require('fs-extra')
var path = require('path')
var chalk = require('chalk')

import getAppPath from '../app/src/getAppPath'
import loopInput from '../app/src/loopInput'
import { PROJECT_BASE_PATH } from '../src.config'


let existApp = null

const pagePath = loopInput('\n输入页面的路径(a/b/c || a/b/c.js): ', (input) => {
  const app = getAppPath(PROJECT_BASE_PATH, input)
  if (fs.existsSync(app.page.absolutePath) || fs.existsSync(path.join(PROJECT_BASE_PATH, app.page.importPath))) {
    existApp = app
    return true
  }
  return false
})

const REMOVE_MAP = { page: 1, parser: 1, container: 1 }

for (let [key, value] of Object.entries(existApp)) {
  if (REMOVE_MAP[key]) {
    const removePath = path.join(PROJECT_BASE_PATH, value.importPath)
    fs.remove(removePath).then(() => {
      console.log(chalk.yellow(`>>> [${key}] ${removePath} 成功移除`));
    })
  }
}


