

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
import createPageData from '../project/src/createPageData';
import getPages from '../utils/getPages';

let projectBasePath = PROJECT_BASE_PATH
projectBasePath = '/Users/kunsam/web/order-pay-system' // test

let pageData = []
let port = null

try {
  port = require(path.join(projectBasePath, 'config.js')).port
} catch (e) {
  throw Error(chalk.red('项目不存在 config.js'))
}

try {
  // 没有page-data.js帮项目生成一个
  if (!fs.existsSync(path.join(projectBasePath, './page-data.js'))) {
    console.log(chalk.yellow(`>>> 不存在pata-data.js 已为您生成`));
    createPageData(projectBasePath)
  } else {
    pageData = require(path.join(projectBasePath, './page-data.js')).pages
  }
  
} catch (e) {
  console.log(e);
}
const pages = getPages(projectBasePath)

console.log(chalk.magenta('\n-- 可展开的app有:'))
pages.forEach((file, index) => { console.log(chalk.white(`${index + 1}.${file}`)) })

const appIndex = getAppIndex()
const ipaddress = getIp()

const choosePage = pages[appIndex - 1] 

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
