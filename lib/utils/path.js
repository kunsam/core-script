'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPagePath = getPagePath;
var upperFirst = require('lodash/upperFirst');

function getPagePath(path) {
  if (!path) throw Error('不存在该path');
  var result = path.split('/').map(function (p) {
    return p.indexOf('.') <= 0 && upperFirst(p) || p;
  });
  if (result[result.length - 1].indexOf('.') <= 0) {
    result.push('index.js');
  }
  return result.join('/');
}