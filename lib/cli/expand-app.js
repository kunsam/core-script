'use strict';

var _file = require('../utils/file');

var _expand = require('../app/expand');

var _expand2 = _interopRequireDefault(_expand);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var path = require('path');
var upperFirst = require('lodash/upperFirst');
var readlineSync = require('readline-sync');

var basePath = _config2.default.basePath;


var joinedFiles = (0, _file.joinFilesName)((0, _file.getFilesTree)(path.join(basePath, 'pages'))).map(function (file) {
  return file.fullImportPath;
}).filter(function (file) {
  return file.split('/').length > 1;
});

console.log((0, _file.joinFilesName)((0, _file.getFilesTree)(path.join(basePath, 'pages'))), 'asdsad');

console.log('可展开的app有:');
joinedFiles.forEach(function (file, index) {
  console.log(index + 1 + '.' + file);
});

var appIndex = getAppIndex();

var app = joinedFiles[appIndex - 1];

(0, _expand2.default)(basePath, app);

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