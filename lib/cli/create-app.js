'use strict';

var _generateApp = require('../app/src/generateApp');

var _generateApp2 = _interopRequireDefault(_generateApp);

var _expand = require('../app/expand');

var _expand2 = _interopRequireDefault(_expand);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 创建一个单页应用


var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var readlineSync = require('readline-sync');

var basePath = _config2.default.basePath;


var pagePath = readlineSync.question('\n输入页面的路径(a/b/c || a/b/c.js): ');

if (!pagePath) {
  console.log(chalk.red('未输入或输入错误!'));
} else {
  (0, _generateApp2.default)(basePath, pagePath);
  var NO = { no: 1, No: 1, NO: 1 };
  var isOpen = readlineSync.question('\n是否展开APP业务(yes[默认]/no): ');
  if (!NO[isOpen]) {
    (0, _expand2.default)(basePath, pagePath);
  }
}