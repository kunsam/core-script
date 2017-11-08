
import CORE from '../../package.config'
import chalk from 'chalk'
var readlineSync = require('readline-sync')
var shell = require('shelljs')


CORE.forEach((data, index) => {
  console.log(chalk.blue(`--| ${data.class} | --`))
  data.children.forEach((child, cindex) => {
    console.log(`${index + 1}${cindex + 1}.[${child.name}] abbr: `, chalk.yellow(`[core ${child.abbr}]`), child.comment)
  })
})

const choose = readlineSync.question('测试哪一个命令?[输入序号]: ')
const firstIndex = choose && choose[0] && parseInt(choose[0]) - 1
const childIndex = choose && choose[0] && parseInt(choose[1]) - 1

const target = CORE[firstIndex] && CORE[firstIndex].children[childIndex]
if (!target) {
  console.log(chalk.red('未输入或输入错误!'))
} else {
  shell.exec(`NODE_ENV=node babel-node src/cli/${target.name}.js`)
}