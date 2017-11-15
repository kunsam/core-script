import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import CORE from '../../src/package.config'
import CONFIG from './config'

const basePath = path.join(__dirname, '../../')

const bins = fs.readdirSync(path.join(basePath, 'bin'))
const srcClis = fs.readdirSync(path.join(basePath, 'src/cli'))

const binsMap = new Map(bins.map(bin => ([bin, 1])))
const srcCliMap = new Map(srcClis.map(bin => ([bin, 1])))

const whiteList = new Map(CONFIG.bin.whiteList.map(d => ([d, 1])))


let bin = {
  'CORE': 'bin/core.js'
}
console.log(chalk.white(`>>> 存在的文件将不会被替换，如要更新请删除\n`))

CORE.forEach(data => {
  data.children.forEach(child => {

    bin[`CORE-${child.name}`] = `bin/core-${child.name}.js`
    bin[`CORE-${child.abbr}`] = `bin/core-${child.name}.js`

    const binFileKey = `core-${child.name}.js`
    const srcCliFileKey = `${child.name}.js`

    const binFilePath = path.join(basePath, 'bin', binFileKey)
    const srcCliFilePath = path.join(basePath, 'src/cli', srcCliFileKey)

    if (binsMap.has(binFileKey)) {
      binsMap.delete(binFileKey)
    } else {
      console.log(chalk.cyan(`>>> 创建了：[bin ${binFileKey}]`))
      fs.writeFileSync(binFilePath, `#!/usr/bin/env node\nrequire('../lib/cli/${srcCliFileKey}');`)
    }

    if (srcCliMap.has(srcCliFileKey)) {
      srcCliMap.delete(srcCliFileKey)
    } else {
      console.log(chalk.cyan(`>>> 创建了：[src/cli ${srcCliFileKey}]`))
      fs.writeFileSync(srcCliFilePath, `\n// $${child.comment}`)
    }

  })
})

binsMap.forEach((value, key) => {
  if (!whiteList.has(key)) {
    console.log(chalk.yellow(`[bin/] 需要移除或改名的文件: ${key}`))
    // fs.unlinkSync(path.join(basePath, 'bin', key))
  }
})

srcCliMap.forEach((value, key) => {
  if (!whiteList.has(key)) {
    console.log(chalk.yellow(`[src/cli] 需要移除或改名的文件: ${key}`))
    // fs.unlinkSync(path.join(basePath, 'bin', key))
  }
})

const packJson = require('../../package.json')
fs.writeFileSync(path.join(__dirname, '../../package.json'), JSON.stringify({ ...packJson, bin }, null, 2))

