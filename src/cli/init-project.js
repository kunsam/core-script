var fs = require('fs')
var path = require('path')
var chalk = require('chalk')
var shell = require('shelljs')
import config from '../config'
const { basePath } = config
// 这个脚本用于初始化项目，相当于开始的引导，打开相关的配置文件

console.log(chalk.yellow('>>> welcome to start a project'))
console.log(chalk.yellow('>>> 即将为你打开项目初始须知'))

const INIT_FILES = [
  '.assist/project/get-start.md'
]

INIT_FILES.forEach(file => {
  if (fs.existsSync(path.join(basePath, file))) {
    shell.exec(`code ${path.join(basePath, file)}`)
  } else {
    console.log(`${path.join(basePath, file)} 不存在`);
  }
})