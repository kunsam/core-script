'use strict';

var _file = require('../utils/file');

var _expand = require('../app/expand');

var _expand2 = _interopRequireDefault(_expand);

var _src = require('../src.config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var os = require('os');
var path = require('path');
var chalk = require('chalk');
var upperFirst = require('lodash/upperFirst');
var readlineSync = require('readline-sync');

var pageData = {};
var port = null;

try {
  port = require(path.join(_src.PROJECT_BASE_PATH, 'config.js')).port;
} catch (e) {
  throw Error(chalk.red('项目不存在 config.js'));
}

try {
  pageData = require(path.join(_src.PROJECT_BASE_PATH, 'page-data.js'));
} catch (e) {
  console.log(chalk.red('项目不存在 pageData，请创建一份 [core init pageData]<core inpd>'));
}

var joinedFiles = (0, _file.joinFilesName)((0, _file.getFilesTree)(path.join(_src.PROJECT_BASE_PATH, 'pages'))).map(function (file) {
  return file.fullImportPath;
}).filter(function (file) {
  return file.split('/').length > 1;
});

console.log(chalk.magenta('\n-- 可展开的app有:'));
joinedFiles.forEach(function (file, index) {
  console.log(chalk.white(index + 1 + '.' + file));
});

var appIndex = getAppIndex();

var ipaddress = os.hostname();
console.log(ipaddress, '');

var app = {
  path: joinedFiles[appIndex - 1],
  router: ipaddress + ':' + port + '/' + joinedFiles[appIndex - 1],
  designs: pageData.default
};

(0, _expand2.default)(_src.PROJECT_BASE_PATH, app);

function getAppIndex() {
  var result = null;
  loop();
  function loop() {
    var input = readlineSync.question('\n你需要展开哪个app? 输入序号: ');
    var appIndex = input && parseInt(input);
    if (!appIndex || appIndex <= 0) {
      console.log('输入错误，请重新输入');
      loop();
    } else {
      result = appIndex;
    }
  }
  return result;
}