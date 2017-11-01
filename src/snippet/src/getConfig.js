


const fs = require('fs')
const merge = require('lodash/merge')
const find = require('lodash/find')

export default function getConfig(basePath) {
  const defaultConfig = require('../default.config.js')
  let config = defaultConfig
  const userConfigPath = `${basePath}/.core-config/member/member.config.js`

  if (fs.existsSync(userConfigPath)) {
    const userConfig = require(userConfigPath)
    const userSnipperUsageRules =
      userConfig.snippet &&
      userConfig.snippet.usage && 
      userConfig.snippet.usage.rules 
    let mergedResult = []
    if (userSnipperUsageRules.length)   {
      const defaultRules = defaultConfig.snippet.usage.rules
      // const baseRules = defaultRules.length < userSnipperUsageRules.length ? userSnipperUsageRules : defaultRules
      // 先填充userConfig.snippet.usage.rules
      const srcWithoutUser = defaultRules.filter(drule => !find(userSnipperUsageRules, urule => urule.test.toString() === drule.test.toString()))
      mergedResult = userSnipperUsageRules.map(urule => {
        const findItInDefault = find(defaultRules, drule => drule.test.toString() === urule.test.toString())
        return findItInDefault ? Object.assign(findItInDefault, urule) : urule
      }).concat(srcWithoutUser)
    }
    config = merge(userConfig,  defaultConfig)
    config.snippet.usage.rules = mergedResult
  } else {
    console.log(`>>> 不存在用户自定义成员配置，将使用默认配置 ${userConfigPath}，或使用 core init-core 配置`);
  }
  return config
}
