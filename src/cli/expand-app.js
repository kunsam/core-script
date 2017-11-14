

var fs = require('fs')
var os = require('os')
var path = require('path')
var chalk = require('chalk')
var upperFirst = require('lodash/upperFirst')
var readlineSync = require('readline-sync')

import { getFilesTree, joinFilesName } from '../utils/file'
import expandApp from '../app/expand'

import { PROJECT_BASE_PATH } from '../src.config'

let pageData = {}
let port = null

try {
  port = require(path.join(PROJECT_BASE_PATH, 'config.js')).port
} catch (e) {
  throw Error(chalk.red('项目不存在 config.js'))
}

try {
  pageData = require(path.join(PROJECT_BASE_PATH, 'page-data.js'))
} catch (e) {
  console.log(chalk.red('项目不存在 pageData，请创建一份 [core init pageData]<core inpd>'));
}

const joinedFiles = joinFilesName(getFilesTree(path.join(PROJECT_BASE_PATH, 'pages')))
  .map(file => file.fullImportPath).filter(file => file.split('/').length > 1)


console.log(chalk.magenta('\n-- 可展开的app有:'))
joinedFiles.forEach((file, index) => { console.log(chalk.white(`${index + 1}.${file}`)) })

const appIndex = getAppIndex()

const ipaddress = os.hostname()
console.log(ipaddress, '');

const app = {
  path: joinedFiles[appIndex - 1],
  router: `${ipaddress}:${port}/${joinedFiles[appIndex - 1]}`,
  designs: pageData.default
}

expandApp(PROJECT_BASE_PATH, app)


function getAppIndex() {
  let result = null
  loop()
  function loop() {
    var input = readlineSync.question('\n你需要展开哪个app? 输入序号: ')
    let appIndex = input && parseInt(input)
    if (!appIndex || appIndex <= 0) {
      console.log('输入错误，请重新输入');
      loop()
    } else {
      result = appIndex
    }
  }
  return result
}
