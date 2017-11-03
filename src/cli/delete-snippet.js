var fs = require('fs')
var path = require('path')
var chalk = require('chalk')
var readlineSync = require('readline-sync')


import loopInput from '../app/src/loopInput'
import config from '../config'
const { basePath } = config


const snippetDirs = fs.readdirSync(path.join(__dirname, '../snippet/bin'))
const COMMENT_MAP = {
  ALL: '全部',
  graphQl: 'graphQl相关',
  member: '成员使用与引入补全',
  restApi: 'restful-api补全',
}


console.log(chalk.magenta(`-- [补全类目录]:`))
snippetDirs
  .sort((a, b) => (a.length - b.length))
  .forEach((dir, index) => { console.log(chalk.white(`${index + 1}. ${dir} —— [${COMMENT_MAP[dir]}]`)) })


const choose = loopInput('删除哪类的补全？输入序号: ', (input) => {
  const choose = input && parseInt(input)
  if (choose && choose > 0 && choose <= snippetDirs.length) return choose - 1
})


const snippetType = snippetDirs[choose]
if (snippetType !== 'ALL') {
  deleteSnippet(snippetType)
} else {
  snippetDirs
    .filter(dir => dir !== 'ALL')
    .forEach(type => { deleteSnippet(type) })
}


function deleteSnippet (snippetType) {

  const historyDataPath = path.join(__dirname, '../snippet/data', snippetType)
  const historyDatas = fs.readdirSync(historyDataPath)
  
  if (!historyDatas.length) {
  
    console.log(chalk.yellow(`>>> [${snippetType}] 没有需要删除的项目!`))
    
  } else {
  
    console.log(chalk.magenta(`\n-- [项目目录]:`))
  
    historyDatas
      .sort((a, b) => (a.length - b.length))
      .forEach((file, index) => { console.log(chalk.white(`${index + 1}. ${file}`)) })
  
    const choose2 = loopInput(`[${snippetType}] 删除哪个项目的？输入序号:`, (input) => {
      const choose = input && parseInt(input)
      if (choose && choose > 0 && choose <= historyDatas.length) return choose - 1
    })
  
    const doDelete = require(`../snippet/bin/${snippetType}/delete.js`).default
  
    doDelete(basePath, `${historyDataPath}/${historyDatas[choose2]}`)
  
  }
}








