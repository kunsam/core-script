

const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const fetch = require('isomorphic-unfetch')


import { resolvePath } from '../../src/path'
import createSnippet from './createSnippet'
import processApiList from './processApiList'
import generateSnippet from '../../src/generateSnippet'

export default (basePath) => {

  const config = require(path.join(basePath, '.core-config/restApi/config')).default
  console.log(chalk.yellow(`>> [restApi] 开始导出补全，tips: 若原有补全中有相同的补全，将会被直接覆盖`))

  if (config.debug) {
    console.log(chalk.grey('>>> 使用 [mockData] 生成补全'))

    generateSnippet({
      outputPath: resolvePath(basePath, config.outputPath.snippet),
      snippet: createSnippet(processApiList(config.mockData, config.authField), basePath),
      dataPath: path.join(__dirname, '../../data/restApi', `${basePath.split('/').join('-')}.json`)
    })
    
  } else {
    fetch(config.src)
    .then( r => r ) // .json() )
    .then( data => {
      if (data && data.length) {
        console.log(chalk.yellow('>>> 请求数据正确，开始导出补全\n'));
        console.log(data);
        // 这里还未完善
        generateSnippet({
          outputPath: resolvePath(basePath, config.outputPath.snippet),
          snippet: createSnippet(processApiList(data, config.authField), basePath),
          dataPath: path.join(__dirname, '../../data/restApi', `${basePath.split('/').join('-')}.json`)
        })
      } else {
        throw Error('请求数据出错，请检查')
      }
    })
  }
}

