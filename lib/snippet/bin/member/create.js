'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getConfig = require('../../src/getConfig');

var _getConfig2 = _interopRequireDefault(_getConfig);

var _file = require('../../../utils/file');

var _path = require('../../src/path');

var _generateImportSnippet = require('../../src/generateImportSnippet');

var _generateImportSnippet2 = _interopRequireDefault(_generateImportSnippet);

var _generateUsageSnippet = require('../../src/generateUsageSnippet');

var _generateUsageSnippet2 = _interopRequireDefault(_generateUsageSnippet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');

exports.default = function (basePath) {

  var config = (0, _getConfig2.default)(basePath);
  var configSnippetPath = config.snippet.outputPath;
  if (!configSnippetPath) throw Error('\u672A\u914D\u7F6E\u8F93\u51FA\u8DEF\u5F84 > .core-config/member/member.config.js > snippet.outputPath');

  var outputPath = (0, _path.resolvePath)(basePath, configSnippetPath);
  console.log(chalk.yellow('>> \u5F00\u59CB\u5BFC\u51FA\u6210\u5458\u8865\u5168\uFF0Ctips: \u82E5\u539F\u6709\u8865\u5168\u4E2D\u6709\u76F8\u540C\u7684\u8865\u5168\uFF0C\u5C06\u4F1A\u88AB\u76F4\u63A5\u8986\u76D6\n'));
  var ALLSNIPPETS = {};
  config.snippet.import.paths.forEach(function (member) {
    var joinedFiles = (0, _file.joinFilesName)((0, _file.getFilesTree)(path.join(basePath, './' + member.path))).filter(function (j) {
      return (/\.(js|jsx)$/.test(j.name)
      );
    });
    var snippets = (0, _generateImportSnippet2.default)(joinedFiles, config, member);
    if (snippets) {
      ALLSNIPPETS = Object.assign(ALLSNIPPETS, snippets.snippet);
    }
  });
  config.snippet.usage.paths.forEach(function (member) {
    var joinedFiles = (0, _file.joinFilesName)((0, _file.getFilesTree)(path.join(basePath, './' + member.path)));
    var usage = (0, _generateUsageSnippet2.default)(joinedFiles, config, member);
    if (usage) {
      ALLSNIPPETS = Object.assign(ALLSNIPPETS, usage.snippet);
    }
  });

  console.log(ALLSNIPPETS, 'ALLSNIPPETSALLSNIPPETS');

  // const tip = fs.existsSync(outputPath) ? chalk.bold('更新') : chalk.italic('生成')
  // if (fs.existsSync(outputPath)) {
  //   const origin = require(outputPath)
  // }


  // fs.writeFileSync(outputPath, `${JSON.stringify(ALLSNIPPETS, null, 2)}`)
  // console.log(chalk.yellow(`>> 成员补全${tip}完成: ${outputPath}\n`));
  // // 我自己需要保留备份数据的路径，和业务无关
  // const DATA_IMPORT_SNIPPET_PATH = path.join(__dirname, '../data/snippet/import/snippet.json') 
  // const DATA_IMPORT_MEMBERS_PATH = path.join(__dirname, '../data/snippet/import/members.json')
  // fs.writeFileSync(DATA_IMPORT_SNIPPET_PATH, `${JSON.stringify(ALLSNIPPETS, null, 2)}`)
  // fs.writeFileSync(DATA_IMPORT_MEMBERS_PATH,`${JSON.stringify({ members: SNIPPETMEMBERS }, null, 2)}`)

};