'use strict';

var _loopInput = require('../app/src/loopInput');

var _loopInput2 = _interopRequireDefault(_loopInput);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var readlineSync = require('readline-sync');
var shell = require('shelljs');

var basePath = _config2.default.basePath;


var snippetDirs = fs.readdirSync(path.join(__dirname, '../snippet/bin'));
var COMMENT_MAP = {
  ALL: '全部',
  graphQl: 'graphQl相关',
  member: '成员使用与引入补全',
  restApi: 'restful-api补全'
};
snippetDirs.sort(function (a, b) {
  return a.length - b.length;
}).forEach(function (dir, index) {
  console.log(chalk.white(index + 1 + '. ' + dir + ' \u2014\u2014 [' + COMMENT_MAP[dir] + ']\n'));
});

var choose = (0, _loopInput2.default)('创建哪类的补全？输入序号: ', function (input) {
  var choose = input && parseInt(input);
  if (choose && choose > 0 && choose <= snippetDirs.length) return choose - 1;
});

var generateSnippet = require('../snippet/bin/' + snippetDirs[choose] + '/create.js').default;

var snippet = generateSnippet(basePath);

// console.log(choose, 'choose');