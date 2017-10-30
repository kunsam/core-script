'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var packJson = require('../package.json');
// 以下路径配置是相对与项目根路径的配置

exports.default = {
  version: packJson.version,

  basePath: process.cwd(),

  pkgBasePath: _path2.default.dirname(module.id),

  xmind: {
    ui: {
      path: 'Xmind/ui'
    }
  }
};