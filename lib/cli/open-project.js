'use strict';

var _src = require('../src.config');

var _loopInput = require('../app/src/loopInput');

var _loopInput2 = _interopRequireDefault(_loopInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// $快速打开项目 [创建配置文件]（选择后可以超链接进行配置）
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var shell = require('shelljs');

var userConfigPath = path.join(_src.PROJECT_BASE_PATH, '.core-config/core.config.js');
if (!fs.existsSync(userConfigPath)) throw Error('请在项目根路径下配置.core-config/core.config.js 或使用 init-core');
var userConfig = require(userConfigPath);
var projects = userConfig.projects;


if (!projects) throw Error('\u4E0D\u5B58\u5728projects\u914D\u7F6E\uFF0C\u8BF7\u6DFB\u52A0 ' + userConfigPath);

console.log(chalk.magenta('-- [\u9879\u76EE]:'));
projects.forEach(function (project, index) {
  console.log(chalk.white(index + 1 + '. ' + project.name));
});

var choose = (0, _loopInput2.default)('打开哪个项目: ', function (input) {
  var choose = input && parseInt(input);
  if (choose && choose > 0 && choose <= projects.length) return choose - 1;
});

shell.exec('code ' + projects[choose].path);