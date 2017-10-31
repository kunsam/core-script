'use strict';

var _loggerList = require('../utils/loggerList');

var _loggerList2 = _interopRequireDefault(_loggerList);

var _generateUi = require('../xmind/ui/generateUi');

var _generateUi2 = _interopRequireDefault(_generateUi);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs-extra');
var path = require('path');
var chalk = require('chalk');

var basePath = _config2.default.basePath;


var userConfigPath = path.join(basePath, 'core.config.js');
if (!fs.existsSync(userConfigPath)) throw Error('请在项目根路径下配置core.config.js 或使用 init-core');
var userConfig = require(userConfigPath).default;

var xmind = userConfig.xmind;

// projectRootPath: config.basePath

console.log(chalk.yellow('>>>友情提示：执行命令的路径必须为项目的根路径，否则会存在路径错误\n'));

// console.log(xmind, basePath, 'config');

if (!xmind.ui.path) throw Error('请配置 xmind.ui.path ');

var sourcePath = path.join(basePath, xmind.ui.path);
var outputPath = path.join(basePath, xmind.ui.output || xmind.ui.path);

// console.log(sourcePath, outputPath, 'sourcePath')

var uiFiles = fs.readdirSync(sourcePath).filter(function (f) {
  return (/\.xmind/.test(f)
  );
});

if (!uiFiles.length) console.log(chalk.red('不存在xmind文件，请确认！\n'));

// 得到app-dom树，生成一个对应dom树文件和一个对应css文件，  拆分react-component成组件，生成dom树和对应css文件
var apps = [];

(0, _loggerList2.default)(uiFiles, '扫描到的xmind的文件');

var UIs = (0, _generateUi2.default)(uiFiles, sourcePath);

// todo后期暴露创建元件方法，让这里直接创建出组件
var componentPath = path.join(basePath, 'components');

UIs.forEach(function (app) {
  var appPath = path.join(outputPath, app.name);
  if (fs.existsSync(appPath)) {
    console.log(chalk.yellow('>> ' + appPath + '\u5DF2\u5B58\u5728\uFF0C\u5982\u8981\u91CD\u65B0\u751F\u6210\u8BF7\u5220\u9664\u8BE5\u76EE\u5F55\n'));
  } else {
    fs.ensureDirSync(appPath);
    var imports = '';
    app.result.importComponents.forEach(function (com) {
      imports += 'import ' + app.name + ' from \'components/' + app.name + '\'\n';
    });
    fs.writeFileSync(path.join(appPath, 'index.html'), imports + app.result.html);
    fs.writeFileSync(path.join(appPath, 'index.scss'), app.result.css);
  }
});

console.log(chalk.yellow('>> \u751F\u6210\u5B8C\u6BD5\n'));