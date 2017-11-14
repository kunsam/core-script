var fs = require('fs')
var path = require('path')
var chalk = require('chalk')
var shell = require('shelljs')

var upperFirst = require('lodash/upperFirst')
var readlineSync = require('readline-sync')

import findImports from 'find-imports'
import { getFilesTree, joinFilesName } from '../utils/file'


export default (basePath, { path, router, designs }) => {
  const containerDir = path.split('/').map(p => {
    if (p !== 'index.js') return upperFirst(p.split('.')[0])
    return null
  }).filter(a => !!a).join('/')
  let memebers = [
    `pages/${path}`,
    `parsers/${path}`,
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
      // shell.exec(`code ${data}`) ！！！！！！！
    } else {
      console.log(chalk.red('>>> 不存在对应的文件!', data, '\n'))
    }
  })

  let chromeShell = `chrome ${router}`

  console.log(designs, chromeShell);

  // shell.exec(`chrome ${path.desi}`)

  console.log(chalk.yellow('Hi ' + path + '!'))
}