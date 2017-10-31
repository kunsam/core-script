'use strict';

var _initCore = require('../init.core.config');

var _initCore2 = _interopRequireDefault(_initCore);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs-extra');
var path = require('path');

fs.writeFileSync(path.join(_config2.default.basePath, 'core.config.js'), _initCore2.default);
console.log('>>> 初始化成功！');