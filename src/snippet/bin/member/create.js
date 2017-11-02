

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

import getConfig from '../../src/getConfig'
import { getFilesTree, joinFilesName } from '../../../utils/file'
import { resolvePath } from '../../src/path'
import generateImportSnippet from '../../src/generateImportSnippet'
import generateUsageSnippet from '../../src/generateUsageSnippet'


export default (basePath) => {

  const config = getConfig(basePath)
  const configSnippetPath = config.snippet.outputPath
  if (!configSnippetPath) throw Error(`未配置输出路径 > .core-config/member/member.config.js > snippet.outputPath`)

  const outputPath = resolvePath(basePath, configSnippetPath)
  console.log(chalk.yellow(`>> 开始导出成员补全，tips: 若原有补全中有相同的补全，将会被直接覆盖\n`))
  let ALLSNIPPETS = {}
  config.snippet.import.paths.forEach(member => {
    const joinedFiles = joinFilesName(getFilesTree(path.join(basePath, `./${member.path}`))).filter(j => /\.(js|jsx)$/.test(j.name))
    const snippets = generateImportSnippet(joinedFiles, config, member)
    if (snippets) {
      ALLSNIPPETS = Object.assign(ALLSNIPPETS, snippets.snippet)
    }
  })
  config.snippet.usage.paths.forEach(member => {
    const joinedFiles = joinFilesName(getFilesTree(path.join(basePath, `./${member.path}`)))
    const usage = generateUsageSnippet(joinedFiles, config, member)
    if (usage) {
      ALLSNIPPETS = Object.assign(ALLSNIPPETS, usage.snippet)
    }
  })
  
  if (!fs.existsSync(outputPath)) throw Error(`输出路径不存在 ${outputPath}`)

  const origin = require(outputPath)
  fs.writeFileSync(outputPath, `${JSON.stringify(Object.assign(origin, ALLSNIPPETS), null, 2)}`)
  console.log(chalk.yellow(`>> 成员补全更新完成: ${outputPath}\n`));


  // 成员补全的keys表存下来
  let memberSnippetKeys = {}
  Object.keys(ALLSNIPPETS).map(key => { memberSnippetKeys[key] = 1 })
  const projectKey = basePath.split('/').join('-')
  const dataPath = path.join(__dirname, '../../data/member', `${projectKey}.json`)
  console.log(dataPath, 'dataPath');

  // 一个项目的对应的basePath对应一个memberSnippet
  fs.writeFileSync(dataPath, `${JSON.stringify(memberSnippetKeys, null, 2)}`)
}






