var fs = require('fs-extra')
var path = require('path')
var chalk = require('chalk')
var readlineSync = require('readline-sync')

import getAppPath from '../app/src/getAppPath'
import loopInput from '../app/src/loopInput'

import config from '../config'
const { basePath } = config

// const pagePath = readlineSync.question('\n输入页面的路径(a/b/c || a/b/c.js): ')
let existApp = null

const pagePath = loopInput('\n输入页面的路径(a/b/c || a/b/c.js): ', (input) => {
  const app = getAppPath(basePath, input)
  if (fs.existsSync(app.page.absolutePath) || fs.existsSync(path.join(basePath, app.page.importPath))) {
    existApp = app
    return true
  }
  return false
})

const REMOVE_MAP = { page: 1, parser: 1, container: 1 }

for (let [key, value] of Object.entries(existApp)) {
  if (REMOVE_MAP[key]) {
    fs.remove(path.join(basePath, value.importPath)).then(() => {
      console.log(chalk.yellow(`>>> [${key}] ${path.join(basePath, value.importPath)} 成功移除`));
    })
  }
}


