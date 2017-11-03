

const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const fetch = require('isomorphic-unfetch')

const processApiList = require('./processApiList')

import createApi from './createApi'


export default (basePath) => {

  const config = require(path.join(basePath, './core-config/restApi/config'))

  if (config.debug) {
    console.log(chalk.yellow('>> 使用 [mockData] 导出'));
    updateApi(config.mockData)
  } else {
    fetch(config.src)
    .then( r => r ) // .json() )
    .then( data => {
      if (data && data.length) {
        console.log(chalk.yellow('>> 请求数据正确，开始导出 \n'));
        console.log(data);
        updateApi(data)
      } else {
        throw Error('请求数据出错，请检查')
      }
    })
  }

  let ALLSNIPPETS = {}

  generateSnippet({
    outputPath,
    snippet: ALLSNIPPETS,
    dataPath: path.join(__dirname, '../../data/restApi', `${basePath.split('/').join('-')}.json`)
  })



}


const find = require('lodash/find')
const createApiMap = require('../src/setApiMap.js')
const createApiRedux = require('../src/apiRedux.js')


function updateApi(apiData) {
  const apiList = processApiList(apiData, config)
  generateApiMap(apiList, config)  // api/Map
  generateApiList(apiList, config) // api/list
  generateApiRedux(apiList, config)
  console.log(chalk.yellow('>> 导出完毕\n'));
}


function generateApiList(apiList, config) {
  const apiOutputDir = resolvePath(config.projectPath, config.outputPath.api)
  const apiFiles = createApi(apiList)
  fs.ensureDirSync(apiOutputDir)
  // 删除不使用的文件
  const origin = fs.readdirSync(apiOutputDir)
  origin.forEach(fileName => {
    if (!find(apiFiles, api => `${api.key}.js` === fileName)) {
      console.log(chalk.cyan(`[generateApiList] ${fileName}在api列表中不存在，将删除该文件`));
      fs.unlinkSync(path.join(apiOutputDir, fileName))
    }
  })
  apiFiles.forEach(api => {
    const filePath = path.join(apiOutputDir, `${api.key}.js`)
    if (fs.existsSync(filePath)) {
      console.log(chalk.red(`[generateApiList] ${api.key}.js已存在，如要更新请删除该文件`));
    } else {
      fs.writeFileSync(filePath, api.file)
    }
  })
  console.log(chalk.cyan(`已更新api调用列表: ${apiOutputDir}\n`));
}

function generateApiMap (apiList, basePath) {
  const apiMapPath = resolvePath(basePath, config.outputPath.apiMap)
  fs.writeFileSync(apiMapPath, createApiMap(apiList))
  console.log(chalk.cyan(`已更新api-map: ${apiMapPath}\n`));
}

function generateApiRedux(apiList, config) {
  const actionListDir = resolvePath(basePath, config.outputPath.action)
  const sagaListDir = resolvePath(basePath, config.outputPath.saga)
  const selectorListDir = resolvePath(basePath, config.outputPath.selector)

  fs.ensureDirSync(actionListDir)
  fs.ensureDirSync(sagaListDir)
  fs.ensureDirSync(selectorListDir)

    // 删除不使用的文件
  const originActionList = fs.readdirSync(actionListDir)
  const originSagaList = fs.readdirSync(sagaListDir)
  const originSelectorList = fs.readdirSync(selectorListDir)

  originActionList.forEach(fileName => {
    if (!find(apiList, api => `${api.key}.js` === fileName)) {
      console.log(chalk.cyan(`[action/list] ${fileName}在api列表中不存在，将删除该文件\n`));
      fs.unlinkSync(path.join(actionListDir, fileName))
    }
  })
  originSagaList.forEach(fileName => {
    if (!find(apiList, api => `${api.key}.js` === fileName)) {
      console.log(chalk.cyan(`[saga/list] ${fileName}在api列表中不存在，将删除该文件\n`));
      fs.unlinkSync(path.join(sagaListDir, fileName))
    }
  })
  originSelectorList.forEach(fileName => {
    if (!find(apiList, api => `${api.key}.js` === fileName)) {
      console.log(chalk.cyan(`[selector/list] ${fileName}在api列表中不存在，将删除该文件\n`));
      fs.unlinkSync(path.join(selectorListDir, fileName))
    }
  })

  const apiReduxList = createApiRedux(apiList, config)
  apiReduxList.forEach(api => {
    const acion = api.action
    const saga = api.saga
    const selector = api.selector
    const actionfilePath = path.join(actionListDir, `${api.key}.js`)
    const sagafilePath = path.join(sagaListDir, `${api.key}.js`)
    const selectorfilePath = path.join(selectorListDir, `${api.key}.js`)
    if (fs.existsSync(actionfilePath)) {
      console.log(chalk.red(`${actionfilePath}已存在，如要更新请删除该文件\n`));
    } else {
      fs.writeFileSync(actionfilePath, acion)
    }

    if (fs.existsSync(sagafilePath)) {
      console.log(chalk.red(`[saga] ${sagafilePath}已存在，如要更新请删除该文件\n`));
    } else {
      fs.writeFileSync(sagafilePath, saga)
    }

    if (fs.existsSync(selectorfilePath)) {
      console.log(chalk.red(`${selectorfilePath}已存在，如要更新请删除该文件\n`));
    } else {
      fs.writeFileSync(selectorfilePath, selector)
    }

  })

  // 还要生成一个index.js文件
  const list = apiReduxList.map(api => api.key).sort((a, b) => (a.length - b.length))

  const indexFile = `${gs1(list)}\n` +
  `module.exports = {\n` +
  `${gs2(list)}};\n`

  const actionIndexFile = `${gs1(list, true)}\n` +
  `module.exports = {\n` +
  `${gs2(list)}};\n`


  fs.writeFileSync(path.join(actionListDir, `index.js`), actionIndexFile)
  fs.writeFileSync(path.join(sagaListDir, `index.js`), indexFile)
  fs.writeFileSync(path.join(selectorListDir, `index.js`), indexFile)

  console.log(chalk.yellow(`>> 已更新api-redux相关文件\n`));

}


function gs1 (mergeArrays, isAction) {
  var arrayOutputStr = ''
  mergeArrays.forEach((d, index) => {
    arrayOutputStr += `import ${ isAction ? `{ ${d} }` :d } from './${d}'\n`
  })
  return arrayOutputStr
}

function gs2 (mergeArrays) {
  var arrayOutputStr = ''
  mergeArrays.forEach((d, index) => {
    if (index === mergeArrays.length - 1) {
      arrayOutputStr += `  ${d}\n`
      return
    }
    arrayOutputStr += `  ${d},\n`
  })
  return arrayOutputStr
}
