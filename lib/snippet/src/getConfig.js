'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getConfig;


var fs = require('fs');
var merge = require('lodash/merge');
var find = require('lodash/find');

function getConfig(basePath) {
  var defaultConfig = require('../default.config.js');
  var config = defaultConfig;
  var userConfigPath = basePath + '/.core-config/member/member.config.js';

  if (fs.existsSync(userConfigPath)) {
    var userConfig = require(userConfigPath);
    var userSnipperUsageRules = userConfig.snippet && userConfig.snippet.usage && userConfig.snippet.usage.rules;
    var mergedResult = [];
    if (userSnipperUsageRules.length) {
      var defaultRules = defaultConfig.snippet.usage.rules;
      // const baseRules = defaultRules.length < userSnipperUsageRules.length ? userSnipperUsageRules : defaultRules
      // 先填充userConfig.snippet.usage.rules
      var srcWithoutUser = defaultRules.filter(function (drule) {
        return !find(userSnipperUsageRules, function (urule) {
          return urule.test.toString() === drule.test.toString();
        });
      });
      mergedResult = userSnipperUsageRules.map(function (urule) {
        var findItInDefault = find(defaultRules, function (drule) {
          return drule.test.toString() === urule.test.toString();
        });
        return findItInDefault ? Object.assign(findItInDefault, urule) : urule;
      }).concat(srcWithoutUser);
    }
    config = merge(userConfig, defaultConfig);
    config.snippet.usage.rules = mergedResult;
  } else {
    console.log('>>> \u4E0D\u5B58\u5728\u7528\u6237\u81EA\u5B9A\u4E49\u6210\u5458\u914D\u7F6E\uFF0C\u5C06\u4F7F\u7528\u9ED8\u8BA4\u914D\u7F6E ' + userConfigPath + '\uFF0C\u6216\u4F7F\u7528 core init-core \u914D\u7F6E');
  }
  return config;
}