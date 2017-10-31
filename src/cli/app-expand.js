

var fs = require('fs')
var path = require('path')
var chalk = require('chalk')
var shell = require('shelljs')

var upperFirst = require('lodash/upperFirst')
var readlineSync = require('readline-sync')

import findImports from 'find-imports'
import { getFilesTree, joinFiles } from '../utils/file'

import config from '../config'
const { basePath } = config

const joinedFiles = joinFiles(getFilesTree(path.join(__dirname, '../../../pages')))
  .map(file => file.fullImportPath).filter(file => file.split('/').length > 1)

console.log('可展开的app有:')
joinedFiles.forEach((file, index) => { console.log(`${index + 1}.${file}`) })

const appIndex = getAppIndex()

const app = joinedFiles[appIndex - 1]

const containerDir = app.split('/').map(p => {
  if (p !== 'index.js') return upperFirst(p.split('.')[0])
  return null
}).filter(a => !!a).join('/')

let memebers = [
  `pages/${app}`,
  `parsers/${app}`,
  `containers/${containerDir}/index.js`,
  `containers/${containerDir}/index.scss`,
]

var mode = readlineSync.question('是否展开依赖元件?(y/n)(回车默认n)')

const imports = findImports(path.join(basePath, `containers/${containerDir}/index.js`), {
  flatten: true,
  absoluteImports: true,
  relativeImports: true,
  packageImports: false
}).map(imp => {
  let impSplits = imp.split('/').filter(s => s!== '..')
  if (impSplits.length > 1 && impSplits[impSplits.length - 1].indexOf('.js') <= 0) {
    impSplits.push('index.js')
  }
  console.log(chalk.cyan(`>>> 扫描到组件, ${impSplits.join('/')}`))
  return impSplits.join('/')
})


if (mode && mode === 'y') {
  memebers = memebers.concat(imports)
}

memebers.forEach(data => {
  if (fs.existsSync(path.join(basePath, data))) {
    shell.exec(`code ${data}`)
  } else {
    console.log(chalk.red('>>> 不存在对应的文件!', data, '\n'))
  }
})

console.log(chalk.yellow('Hi ' + app + '!'))

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
