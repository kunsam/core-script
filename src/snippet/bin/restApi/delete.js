

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

import { resolvePath } from '../../src/path'


export default (basePath, dataPath) => {
  const config = require(path.join(basePath, '.core-config/restApi/config')).default
  const outputPath = resolvePath(basePath, config.outputPath.snippet)

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
