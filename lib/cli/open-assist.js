'use strict';

var _src = require('../src.config');

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var shell = require('shelljs');

shell.exec('code ' + path.join(_src.PACKAGE_BASE_PATH, 'assist'));

console.log(chalk.yellow('>>> 成功打开'));
// console.log(chalk.yellow('>>> 成功打开 这里要改为在项目中释放一个.assist'))