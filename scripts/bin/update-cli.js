import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import CORE from '../../package.config'
import CONFIG from './config'

const basePath = path.join(__dirname, '../../')

const bins = fs.readdirSync(path.join(basePath, 'bin'))
const srcClis = fs.readdirSync(path.join(basePath, 'src/cli'))

const binsMap = new Map(bins.map(bin => ([bin, 1])))
const srcCliMap = new Map(srcClis.map(bin => ([bin, 1])))

const whiteList = new Map(CONFIG.bin.whiteList.map(d => ([d, 1])))

console.log(binsMap, 'binsMap');

let bin = {}

CORE.forEach(data => {
  data.children.forEach(child => {

    bin[`CORE-${child.name}`] = `bin/core-${child.name}.js`
    bin[`CORE-${child.abbr}`] = `bin/core-${child.name}.js`
  
    const binFileKey = `core-${child.name}.js`
    const srcCliFileKey = `${child.name}.js`

    const binFilePath = path.join(basePath, 'bin', binFileKey)
    const srcCliFilePath = path.join(basePath, 'bin', srcCliFileKey)

    if (binsMap.has(binFileKey)) {
      console.log(chalk.red(`[${binFilePath}}] 已存在，如要更新请删除`))
      binsMap.delete(binFileKey)
    } else {
      fs.writeFileSync(binFilePath, `#!/usr/bin/env node\nrequire('../lib/cli/${srcCliFileKey}');`)
    }

    if (srcCliMap.has(srcCliFileKey)) {
      console.log(chalk.red(`[${srcCliFilePath}}] 已存在，如要更新请删除`))
      srcCliMap.delete(srcCliFileKey)
    } else {
      fs.writeFileSync(srcCliFilePath, `\n// $${child.comment}`)
    }



  })
})


// clear extra file

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
// fs.writeFileSync(path.join(__dirname, '../../package.json'), JSON.stringify({ ...packJson, bin }, null, 2))


// 生成bin文件



// 生成src/cli文件
