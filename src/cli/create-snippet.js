var fs = require('fs')
var path = require('path')
var chalk = require('chalk')
var readlineSync = require('readline-sync')
var shell = require('shelljs')

import loopInput from '../app/src/loopInput'
import { PROJECT_BASE_PATH } from '../src.config'

const snippetDirs = fs.readdirSync(path.join(__dirname, '../snippet/bin'))
const COMMENT_MAP = {
  ALL: '全部',
  graphQl: 'graphQl相关',
  member: '成员使用与引入补全',
  restApi: 'restful-api补全',
}
console.log(chalk.magenta(`-- [补全类型]:`))
snippetDirs
  .sort((a, b) => (a.length - b.length))
  .forEach((dir, index) => { console.log(chalk.white(`${index + 1}. ${dir} —— [${COMMENT_MAP[dir]}]`)) })

const choose = loopInput('创建哪类的补全？输入序号: ', (input) => {
  const choose = input && parseInt(input)
  if (choose && choose > 0 && choose <= snippetDirs.length) return choose - 1
})

const snippetType = snippetDirs[choose]

if (snippetType !== 'ALL') {
  createSnippet(snippetType)
} else {
  snippetDirs
    .filter(dir => dir !== 'ALL')
    .forEach(type => { createSnippet(type) })
}

function createSnippet(snippetType) {
  const doCreate = require(`../snippet/bin/${snippetType}/create.js`).default
  doCreate(PROJECT_BASE_PATH)
}