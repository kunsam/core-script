'use strict';

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var shell = require('shelljs');
var basePath = _config2.default.basePath;
// 这个脚本用于初始化项目，相当于开始的引导，打开相关的配置文件

console.log(chalk.yellow('>>> welcome to start a project'));
console.log(chalk.yellow('>>> 即将为你打开项目初始须知'));

var INIT_FILES = ['.assist/project/get-start.md'];

INIT_FILES.forEach(function (file) {
  if (fs.existsSync(path.join(basePath, file))) {
    shell.exec('code ' + path.join(basePath, file));
  } else {
    console.log(path.join(basePath, file) + ' \u4E0D\u5B58\u5728');
  }
});