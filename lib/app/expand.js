'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _findImports = require('find-imports');

var _findImports2 = _interopRequireDefault(_findImports);

var _file = require('../utils/file');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var shell = require('shelljs');

var upperFirst = require('lodash/upperFirst');
var readlineSync = require('readline-sync');

exports.default = function (basePath, app) {
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
};