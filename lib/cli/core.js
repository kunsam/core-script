'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version(_config2.default.version);

_commander2.default.command('test', 'test');

_commander2.default.command('init-project', 'open the guide of init a project').command('init-core', 'create core.config.js').command('xmind-ui', 'generates ui files from xmind tree').command('xui', 'alias for xmind-ui').command('xmind-plan', 'generates project plan files from xmind tree').command('xplan', 'alias for xmind-plan').command('recompose', 'use recompose faster').command('rcp', 'alias for recompose').command('app-expand', 'expand a app busniess').command('exp', 'alias for app-expand');

_commander2.default.parse(process.argv);