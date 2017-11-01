

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


  console.log(ALLSNIPPETS, 'ALLSNIPPETSALLSNIPPETS');

  // const tip = fs.existsSync(outputPath) ? chalk.bold('更新') : chalk.italic('生成')
  // if (fs.existsSync(outputPath)) {
  //   const origin = require(outputPath)
  // }



  // fs.writeFileSync(outputPath, `${JSON.stringify(ALLSNIPPETS, null, 2)}`)
  // console.log(chalk.yellow(`>> 成员补全${tip}完成: ${outputPath}\n`));
  // // 我自己需要保留备份数据的路径，和业务无关
  // const DATA_IMPORT_SNIPPET_PATH = path.join(__dirname, '../data/snippet/import/snippet.json') 
  // const DATA_IMPORT_MEMBERS_PATH = path.join(__dirname, '../data/snippet/import/members.json')
  // fs.writeFileSync(DATA_IMPORT_SNIPPET_PATH, `${JSON.stringify(ALLSNIPPETS, null, 2)}`)
  // fs.writeFileSync(DATA_IMPORT_MEMBERS_PATH,`${JSON.stringify({ members: SNIPPETMEMBERS }, null, 2)}`)


}






