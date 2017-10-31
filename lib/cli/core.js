'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version(_config2.default.version);

_commander2.default.command('init-project', 'open the guide of init a project').command('init-core', 'create core.config.js').command('xmind-ui', 'generates ui files from xmind tree').command('xmind-plan', 'generates project plan files from xmind tree').command('recompose', 'use recompose faster').command('app-expand', 'expand a app busniess');

console.log('----------下面是缩写的使用-------------');

_commander2.default.command('ipt', 'alias for init-project').command('icr', 'alias for init-core').command('xui', 'alias for xmind-ui').command('xplan', 'alias for xmind-plan').command('rcp', 'alias for recompose').command('exp', 'alias for app-expand');

_commander2.default.parse(process.argv);