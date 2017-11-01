'use strict';

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getAppPath = require('../app/src/getAppPath');

var _getAppPath2 = _interopRequireDefault(_getAppPath);

var _loopInput = require('../app/src/loopInput');

var _loopInput2 = _interopRequireDefault(_loopInput);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs-extra');
var path = require('path');
var chalk = require('chalk');
var readlineSync = require('readline-sync');

var basePath = _config2.default.basePath;

// const pagePath = readlineSync.question('\n输入页面的路径(a/b/c || a/b/c.js): ')

var existApp = null;

var pagePath = (0, _loopInput2.default)('\n输入页面的路径(a/b/c || a/b/c.js): ', function (input) {
  var app = (0, _getAppPath2.default)(basePath, input);
  if (fs.existsSync(app.page.absolutePath) || fs.existsSync(path.join(basePath, app.page.importPath))) {
    existApp = app;
    return true;
  }
  return false;
});

var REMOVE_MAP = { page: 1, parser: 1, container: 1 };

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  var _loop = function _loop() {
    var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
        key = _step$value[0],
        value = _step$value[1];

    if (REMOVE_MAP[key]) {
      fs.remove(path.join(basePath, value.importPath)).then(function () {
        console.log(chalk.yellow('>>> [' + key + '] ' + path.join(basePath, value.importPath) + ' \u6210\u529F\u79FB\u9664'));
      });
    }
  };

  for (var _iterator = Object.entries(existApp)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    _loop();
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}