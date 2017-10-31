'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 这个文件要暴露到项目配置中 core.config.js

var packJson = require('../package.json');
// 以下路径配置是相对与项目根路径的配置

exports.default = {
  version: packJson.version,

  // 命令行执行路径
  basePath: process.cwd(),

  pkgBasePath: _path2.default.dirname(module.id)

};