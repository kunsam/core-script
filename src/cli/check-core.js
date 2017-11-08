
// $check core info [查看core信息]

var chalk = require('chalk')

import * as coreConfig from '../src.config'


console.log(chalk.bgWhite('>>> 【CORE INFO】\n'))
Object.entries(coreConfig).forEach(([key, value]) => {
  console.log(chalk.gray(`${key} : ${value}\n`))
})

