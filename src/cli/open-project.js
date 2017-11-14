
// $快速打开项目 [创建配置文件]（选择后可以超链接进行配置）
var fs = require('fs')
var path = require('path')
var chalk = require('chalk')
var shell = require('shelljs')

import { PROJECT_BASE_PATH } from '../src.config'
import loopInput from '../app/src/loopInput'

const userConfigPath = path.join(PROJECT_BASE_PATH, '.core-config/core.config.js')
if (!fs.existsSync(userConfigPath)) throw Error('请在项目根路径下配置.core-config/core.config.js 或使用 init-core')
const userConfig = require(userConfigPath)
const { projects } = userConfig

if (!projects) throw Error(`不存在projects配置，请添加 ${userConfigPath}`)

console.log(chalk.magenta(`-- [项目]:`))
projects
  .forEach((project, index) => { console.log(chalk.white(`${index + 1}. ${project.name}`)) })

const choose = loopInput('打开哪个项目: ', (input) => {
  const choose = input && parseInt(input)
  if (choose && choose > 0 && choose <= projects.length) return choose - 1
})

shell.exec(`code ${projects[choose].path}`)
