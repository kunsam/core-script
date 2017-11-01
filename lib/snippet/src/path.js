'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvePath = resolvePath;
function resolvePath(projectPath, outputPath) {
  if (outputPath && outputPath.charAt(0) === '/') {
    return outputPath;
  } else {
    var path = require('path');
    return path.join(projectPath, outputPath);
  }
}