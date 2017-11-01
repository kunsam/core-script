'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _config = require('../../../src/config');

var _config2 = _interopRequireDefault(_config);

var _config3 = require('../../config');

var _config4 = _interopRequireDefault(_config3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return '\n// [next\u4E1A\u52A1] https://github.com/zeit/next.js/\n// import Link from \'next/link\' // file:/' + _path2.default.join(_config2.default.pkgBasePath, _config4.default.next.link) + '\n// import dynamic from \'next/dynamic\' // file:/' + _path2.default.join(_config2.default.pkgBasePath, _config4.default.next.dynamic) + '\n';
};