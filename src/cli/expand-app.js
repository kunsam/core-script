

var fs = require('fs')
var path = require('path')
var upperFirst = require('lodash/upperFirst')
var readlineSync = require('readline-sync')

import { getFilesTree, joinFilesName } from '../utils/file'
import expandApp from '../app/expand'

import config from '../config'
const { basePath } = config

const joinedFiles = joinFilesName(getFilesTree(path.join(basePath, 'pages')))
  .map(file => file.fullImportPath).filter(file => file.split('/').length > 1)

console.log(joinFilesName(getFilesTree(path.join(basePath, 'pages'))), 'asdsad');

console.log('可展开的app有:')
joinedFiles.forEach((file, index) => { console.log(`${index + 1}.${file}`) })

const appIndex = getAppIndex()

const app = joinedFiles[appIndex - 1]

expandApp(basePath, app)

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
