'use strict';

var _findImports = require('find-imports');

var _findImports2 = _interopRequireDefault(_findImports);

var _file = require('../utils/file');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var shell = require('shelljs');

var upperFirst = require('lodash/upperFirst');
var readlineSync = require('readline-sync');

var basePath = _config2.default.basePath;


var joinedFiles = (0, _file.joinFiles)((0, _file.getFilesTree)(path.join(basePath, 'pages'))).map(function (file) {
  return file.fullImportPath;
}).filter(function (file) {
  return file.split('/').length > 1;
});

console.log('可展开的app有:');
joinedFiles.forEach(function (file, index) {
  console.log(index + 1 + '.' + file);
});

var appIndex = getAppIndex();

var app = joinedFiles[appIndex - 1];

var containerDir = app.split('/').map(function (p) {
  if (p !== 'index.js') return upperFirst(p.split('.')[0]);
  return null;
}).filter(function (a) {
  return !!a;
}).join('/');

var memebers = ['pages/' + app, 'parsers/' + app, 'containers/' + containerDir + '/index.js', 'containers/' + containerDir + '/index.scss'];

var mode = readlineSync.question('是否展开依赖元件?(y/n)(回车默认n)');

var imports = (0, _findImports2.default)(path.join(basePath, 'containers/' + containerDir + '/index.js'), {
  flatten: true,
  absoluteImports: true,
  relativeImports: true,
  packageImports: false
}).map(function (imp) {
  var impSplits = imp.split('/').filter(function (s) {
    return s !== '..';
  });
  if (impSplits.length > 1 && impSplits[impSplits.length - 1].indexOf('.js') <= 0) {
    impSplits.push('index.js');
  }
  console.log(chalk.cyan('>>> \u626B\u63CF\u5230\u7EC4\u4EF6, ' + impSplits.join('/')));
  return impSplits.join('/');
});

if (mode && mode === 'y') {
  memebers = memebers.concat(imports);
}

memebers.forEach(function (data) {
  if (fs.existsSync(path.join(basePath, data))) {
    shell.exec('code ' + data);
  } else {
    console.log(chalk.red('>>> 不存在对应的文件!', data, '\n'));
  }
});

console.log(chalk.yellow('Hi ' + app + '!'));

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