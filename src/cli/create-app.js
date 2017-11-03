// 创建一个单页应用

var fs = require('fs')
var path = require('path')
var chalk = require('chalk')
var readlineSync = require('readline-sync')
import { PROJECT_BASE_PATH } from '../src.config'

import ExpandApp from '../app/expand'
import generateApp from '../app/src/generateApp'


const pagePath = readlineSync.question('\n输入页面的路径(a/b/c || a/b/c.js): ')
if (!pagePath) {
  console.log(chalk.red('未输入或输入错误!'))
} else {
  generateApp(PROJECT_BASE_PATH, pagePath)
  const NO = { no: 1, No: 1, NO: 1 }
  const isOpen = readlineSync.question('\n是否展开APP业务(yes[默认]/no): ')
  if (!NO[isOpen]) {
    ExpandApp(PROJECT_BASE_PATH, pagePath)
  }
}

