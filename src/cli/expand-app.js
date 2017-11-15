

var fs = require('fs')
var path = require('path')
var chalk = require('chalk')
var find = require('lodash/find')
var upperFirst = require('lodash/upperFirst')
var readlineSync = require('readline-sync')
import { getFilesTree, joinFilesName } from '../utils/file'
import { getPagePath } from '../utils/path'
import expandApp from '../app/expand'
import { PROJECT_BASE_PATH, PACKAGE_BASE_PATH } from '../src.config'
import getIp from '../utils/getIp'

let projectBasePath = PROJECT_BASE_PATH
// projectBasePath = '/Users/kunsam/web/order-pay-system' // test

let pageData = []
let port = null

try {
  port = require(path.join(projectBasePath, 'config.js')).port
} catch (e) {
  throw Error(chalk.red('项目不存在 config.js'))
}

try {
  pageData = require(path.join(projectBasePath, './page-data.js')).pages
} catch (e) {
  console.log(e);
}

const joinedFiles = joinFilesName(getFilesTree(path.join(projectBasePath, 'pages')))
  .map(file => file.fullImportPath).filter(file => file.split('/').length > 1)


console.log(chalk.magenta('\n-- 可展开的app有:'))
joinedFiles.forEach((file, index) => { console.log(chalk.white(`${index + 1}.${file}`)) })

const appIndex = getAppIndex()
const ipaddress = getIp()

const choosePage = joinedFiles[appIndex - 1] 

const _pageData = find(pageData, page => getPagePath(page.page) === getPagePath(choosePage))

const app = {
  path: choosePage,
  router: `${ipaddress}:${port}/${choosePage}`,
  designs: _pageData && _pageData.designs || []
}

expandApp(projectBasePath, app, () => {
  console.log(chalk.yellow('Hi ' + choosePage + '!'))
})


function getAppIndex() {
  let result = null
  loop()
  function loop() {
    var input = readlineSync.question('\n你需要展开哪个app? 输入序号: \n')
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
