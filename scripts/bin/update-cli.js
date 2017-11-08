import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import CORE from '../../package.config'

const basePath = path.join(__dirname, '../../')

const bins = fs.readdirSync(path.join(basePath, 'bin'))
const binsMap = new Map(bins.map(bin => ([bin, 1])))
console.log(binsMap, 'binsMap');

let bin = {}
CORE.forEach(data => {
  data.children.forEach(child => {

    bin[`CORE-${child.name}`] = `bin/core-${child.name}.js`
    bin[`CORE-${child.abbr}`] = `bin/core-${child.name}.js`

    if (binsMap.has(`core-${child.name}`)) {
      console.log(chalk.red(`[core-${child.name}] 已存在，如要更新请删除`))
      binsMap.delete(`core-${child.name}`)
    } else {
      fs.writeFileSync(path.join(basePath, 'bin', `core-${child.name}.js`), `\n// $${child.comment}`)
    }
    
  })
})


console.log(binsMap, 'after binsMap');


const packJson = require('../../package.json')
fs.writeFileSync(path.join(__dirname, '../../package.json'), JSON.stringify({ ...packJson, bin }, null, 2))


// 生成bin文件



// 生成src/cli文件
