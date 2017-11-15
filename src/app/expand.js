var fs = require('fs')
var nodepath = require('path')
var chalk = require('chalk')
var shell = require('shelljs')

var upperFirst = require('lodash/upperFirst')
var readlineSync = require('readline-sync')

import findImports from 'find-imports'
import { getFilesTree, joinFilesName } from '../utils/file'

export default (basePath, { path, router, designs }, callback) => {
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
  var componentExpand = readlineSync.question('是否展开依赖元件?(y/n)(回车默认n)')
  
  var isChrome = readlineSync.question('是否打开浏览器（include router and design）?(y/n)(回车默认n)')

  if (componentExpand && componentExpand === 'y') {
    const imports = findImports(nodepath.join(basePath, `containers/${containerDir}/index.js`), {
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
    memebers = memebers.concat(imports)
  }
  memebers.forEach(data => {
    const mPath = nodepath.join(basePath, data)
    if (fs.existsSync(mPath)) {
      shell.exec(`code ${mPath}`)
    } else {
      console.log(chalk.red('>>> 不存在对应的文件!', mPath, '\n'))
    }
  })

  if (isChrome && isChrome === 'y') {
    let routeSplit = router.split('/')
    const lastKey = routeSplit[routeSplit.length - 1]
    if (lastKey === 'index.js') {
      routeSplit.pop()
    } else {
      routeSplit[routeSplit.length - 1] = lastKey.split('.')[0]
    }
    let chromeShell = `chrome ${routeSplit.join('/')} `
    designs.forEach(design => {
      chromeShell += `&& chrome ${design} `
    })
    shell.exec(chromeShell)
  }
  callback && callback()
}