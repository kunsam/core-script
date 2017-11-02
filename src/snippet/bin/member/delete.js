

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

import getConfig from '../../src/getConfig'
import { getFilesTree, joinFilesName } from '../../../utils/file'
import { resolvePath } from '../../src/path'
import generateImportSnippet from '../../src/generateImportSnippet'
import generateUsageSnippet from '../../src/generateUsageSnippet'


export default (basePath, dataPath) => {

  const config = getConfig(basePath)
  const configSnippetPath = config.snippet.outputPath
  if (!configSnippetPath) throw Error(`未配置输出路径 > .core-config/member/member.config.js > snippet.outputPath`)

  const outputPath = resolvePath(basePath, configSnippetPath)

  if (!fs.existsSync(outputPath)) throw Error(`补全读取路径不存在 ${outputPath}`)

  const origin = require(outputPath)
  const historySnippetJson = require(dataPath)
  let ALLSNIPPETS = {}
  for (let key of Object.keys(origin)) {
    if (!historySnippetJson[key]) ALLSNIPPETS[key] = origin[key]
  }
  fs.writeFileSync(outputPath, `${JSON.stringify(ALLSNIPPETS, null, 2)}`)
  console.log(chalk.yellow(`>> 成员补全更新完成: ${outputPath}\n`))
  fs.unlinkSync(dataPath)

}






