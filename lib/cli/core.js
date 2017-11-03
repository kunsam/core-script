'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _src = require('../src.config');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version(_src.PACKAGE_VERSION);

var CORE = [{
  class: '项目类',
  children: [{ name: 'init-project', abbr: 'ipt', comment: 'open the guide of init a project [打开项目初始引导]' }, { name: 'init-core', abbr: 'icr', comment: 'create core.config.js [创建配置文件]' }, { name: 'xmind-plan', abbr: 'xplan', comment: 'generates project plan files from xmind tree [根据xmind创建项目评估表和工作流表]' }]
}, {
  class: '业务类',
  children: [{ name: 'expand-app', abbr: 'exp', comment: 'expand a app [展开一个页面的全部依赖]' }, { name: 'create-app', abbr: 'cap', comment: 'create a app [创建一个页面级应用程式]' }, { name: 'delete-app', abbr: 'dap', comment: 'delete a app [删除一个页面级应用程式]' }]
}, {
  class: '补全类',
  children: [{ name: 'create-snippet', abbr: 'csni', comment: 'create snippet [创建项目补全]' }, { name: 'delete-snippet', abbr: 'dsni', comment: 'delete snippet [删除项目补全]' }, { name: 'set-snippet', abbr: 'ssni', comment: 'set snippet range [设置项目补全范围]' }]
}, {
  class: '数据类',
  children: [{ name: 'create-rest-api-redux-flow', abbr: 'crarf', comment: 'create restful api redux flow [创建redux数据管理流程]' }, { name: 'create-graphql-api', abbr: 'cgqa', comment: 'create graphql api [创建graphql api 方法]' }]
}, {
  class: '元件类',
  children: [{ name: 'xmind-ui', abbr: 'xui', comment: 'generates ui files from xmind tree [根据xmind生成元件ui文件]' }, { name: 'create-component', abbr: 'ccp', comment: 'create a component [创建一个业务元件]' }]
}, {
  class: '方法类',
  children: [{ name: 'recompose', abbr: 'rcp', comment: 'use recompose faster [快捷使用]' }]
}];

CORE.forEach(function (c) {
  c.children.forEach(function (data) {
    _commander2.default.command(data.name, data.comment);
    _commander2.default.command(data.abbr, 'alias for ' + data.name);
  });
});

_commander2.default.on('--help', function () {
  console.log('\n');
  CORE.forEach(function (c) {
    console.log(_chalk2.default.blue('-- ' + c.class));
    c.children.forEach(function (data, index) {
      console.log(index + 1 + '.[' + data.name + '] abbr: ', _chalk2.default.yellow('<core ' + data.abbr + '>'), data.comment);
    });
    console.log('\n');
  });
});

_commander2.default.parse(process.argv);