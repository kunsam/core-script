'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var program = _commander2.default;
var fs = require('fs-extra');
var path = require('path');
var chalk = require('chalk');


console.log(_config2.default, 'config');

var projectRootPath = path.join(__dirname, '../../../');

console.log(projectRootPath, 'projectRootPath');