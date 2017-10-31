var chalk = require('chalk')
var shell = require('shelljs')

import list from '../recompose'
import readlineSync from 'readline-sync'

// 展开recompose列表

// 选择想使用的并拿到剪切板

// 最后一个是打开官网

console.log(chalk.cyan('【recompose】相关函数：https://github.com/acdlite/recompose/blob/master/docs/API.md\n'))
list.forEach((data, index) => {
  console.log(chalk.magenta(`-> ${data.class} `))
  const children = data.children.sort((a, b) => (a.length - b.length))
  children.forEach((item, iindex) => {
    console.log(`  ${index + 1}${iindex + 1} ${item.key}${item.comment ? ' --- ' : ''}${chalk.grey(item.comment)}`)
  })
})
console.log('\n')

const choose = readlineSync.question('使用哪个函数: ')

if (!choose) {
  console.log(chalk.red('未输入或输入错误!'))
}