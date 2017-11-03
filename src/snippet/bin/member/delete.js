

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

import getConfig from '../../src/getConfig'


export default (basePath, dataPath) => {
  const config = getConfig(basePath)
  const { outputPath } = config.snippet

  const origin = require(outputPath)
  const historySnippetJson = require(dataPath)

  let ALLSNIPPETS = {}
  for (let key of Object.keys(origin)) {
    if (!historySnippetJson[key]) ALLSNIPPETS[key] = origin[key]
  }

  fs.writeFileSync(outputPath, `${JSON.stringify(ALLSNIPPETS, null, 2)}`)
  console.log(chalk.yellow(`\n>> 成员补全更新完成: ${outputPath}\n`))
  fs.unlinkSync(dataPath)

}

