


import commander from 'commander';

const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')

import loggerList from '../utils/loggerList'
import getUI from '../xmind/ui/generateUi'

import config from '../config'
const { basePath, xmind } = config

// projectRootPath: config.basePath
console.log(chalk.yellow('>>>友情提示：执行命令的路径必须为项目的根路径，否则会存在路径错误\n'))

// console.log(xmind, basePath, 'config');

if (!xmind.ui.path) throw Error('请配置 xmind.ui ')

const sourcePath = path.join(basePath, xmind.ui.path)
const outputPath = path.join(basePath, xmind.ui.outputPath || xmind.ui.path)

// console.log(sourcePath, outputPath, 'sourcePath')

const uiFiles = fs.readdirSync(sourcePath).filter(f => /\.xmind/.test(f))

if (!uiFiles.length) console.log(chalk.red('不存在xmind文件，请确认！\n'))

// 得到app-dom树，生成一个对应dom树文件和一个对应css文件，  拆分react-component成组件，生成dom树和对应css文件
const apps = []

loggerList(uiFiles, '扫描到的xmind的文件')

const UIs = getUI(uiFiles, sourcePath)

// todo后期暴露创建元件方法，让这里直接创建出组件
const componentPath = path.join(basePath, 'components')

UIs.forEach(app => {
  const appPath = path.join(outputPath, app.name)
  if (fs.existsSync(appPath)) {
    console.log(chalk.yellow(`>> ${appPath}已存在，如要重新生成请删除该目录\n`))
  } else {
    fs.ensureDirSync(appPath)
    let imports = ''
    app.result.importComponents.forEach(com => {
      imports += `import ${app.name} from 'components/${app.name}'\n`
    })
    fs.writeFileSync(path.join(appPath, 'index.html'), imports + app.result.html)
    fs.writeFileSync(path.join(appPath, 'index.scss'), app.result.css)
  }
})

console.log(chalk.yellow(`>> 生成完毕\n`))
