

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

import getConfig from '../../src/getConfig'



export default (basePath) => {

  const config = getConfig(basePath)
  const { outputPath } = config.snippet



  let ALLSNIPPETS = {}



  generateSnippet({
    outputPath,
    snippet: ALLSNIPPETS,
    dataPath: path.join(__dirname, '../../data/restApi', `${basePath.split('/').join('-')}.json`)
  })



}






