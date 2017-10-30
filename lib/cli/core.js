'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = require('../config');

_commander2.default.version(config.version);

_commander2.default.command('test', 'test');

_commander2.default.command('xmind-ui', 'generates ui files from xmind tree').command('xui', 'alias for generate');

_commander2.default.parse(process.argv);