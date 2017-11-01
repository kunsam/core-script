// 创建一个单页应用


var fs = require('fs')
var path = require('path')
var chalk = require('chalk')
var readlineSync = require('readline-sync')

import generateApp from '../app/src/generateApp'
import ExpandApp from '../app/expand'

import config from '../config'
const { basePath } = config

const pagePath = readlineSync.question('\n输入页面的路径(a/b/c || a/b/c.js): ')

if (!pagePath) {
  console.log(chalk.red('未输入或输入错误!'))
} else {
  generateApp(basePath, pagePath)
  const NO = { no: 1, No: 1, NO: 1 }
  // const isOpen = readlineSync.question('\n是否展开APP业务(yes[默认]/no): ')
  // if (!NO[isOpen]) {
  //   ExpandApp(basePath, pagePath)
  // }
}

