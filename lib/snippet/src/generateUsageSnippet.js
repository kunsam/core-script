'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateUsageSnippet;
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var find = require('lodash/find');
var toLower = require('lodash/toLower');
var escapeRegExp = require('lodash/escapeRegExp');

function generateUsageSnippet(joinedFiles, config, member) {
  var removeFolder = joinedFiles.filter(function (file) {
    return file.type !== 'folder';
  });
  var memberSnippets = {};
  var members = [];
  removeFolder.forEach(function (file) {
    var tmpPath = '';
    var fullName = '' + file.importPath + (file.name === 'index.js' ? '/index.js' : '');
    var findRuleMatchFile = find(config.snippet.usage.rules, function (rule) {
      return rule.test.test(file.name);
    });
    if (findRuleMatchFile) {
      // 匹配正则表达式
      var findInExclude = find(findRuleMatchFile.exclude || [], function (ex) {
        return (ex.match(/(\d|\w){1}.+(\d|\w){1}$/).length && ex.match(/(\d|\w){1}.+(\d|\w){1}$/))[0] === fullName;
      });
      if (!findInExclude) {
        // 不在exclude里的file
        var defaultLoaderPath = path.join(__dirname, '../loader/snippet/' + config.editor + '/' + config.frontLang + '/' + findRuleMatchFile.use + '.js');
        // 先检测是否有用户自定义的该loader
        var userLoaderPath = path.join(config.projectPath, '.core-config/member/loader/' + findRuleMatchFile.use + '.js');
        var loaderPath = fs.existsSync(userLoaderPath) ? userLoaderPath : fs.existsSync(defaultLoaderPath) ? defaultLoaderPath : null;
        if (loaderPath) {
          var loader = require(loaderPath);
          if (typeof loader === 'function') {
            // 过滤掉空文件
            file.absolutePath = path.join(config.projectPath, './' + member.path + '/' + file.importPath);
            var component = { descrition: '该文件非Js文件，没有引入实体', default: {} };
            if (file.name.split('.') && file.name.split('.')[1] === 'js') {
              // js文件引入文件内容
              if (file.importPath) {
                if (file.name === 'index.js') file.absolutePath = path.join(file.absolutePath, './index.js');
                var tmpFile = fs.readFileSync(file.absolutePath, 'utf-8').replace(/require\(.+\)/g, '{}');
                tmpPath = path.join(file.absolutePath, '../', './tmp' + Math.random() * 100 + '.js');
                fs.writeFileSync(tmpPath, tmpFile);
                try {
                  component = require(tmpPath);
                } catch (e) {
                  console.log(chalk.red(file.absolutePath + '\u6682\u65F6\u65E0\u6CD5\u89E3\u6790\n'));
                  component = {};
                }
              }
            }
            if (component) {
              file.root = member.path + '/';
              // ------------------------------------
              // 补全的快捷键核心定义
              // ------------------------------------
              var memeberShortcut = member.shortcut || toLower('' + member.path.slice(0, 1) + member.path.slice(member.path.length - 1));
              file.snippetPrefix = '' + (config.snippet.usage.modeShortcut || 'use') + memeberShortcut + file.shortcut;

              var snippet = loader(file, component, file.absolutePath);
              if (snippet) {
                // 这里使用了recompose displayName 字段 看看有没有多种情况
                memberSnippets['use ' + (component.default.displayName || file.importName) + ' ' + file.key] = snippet;
                members.push(file);
                // console.log(chalk.cyan(`生成了${member.path} -> ${fullName}的组件补全\n`))
              }
            }
          } else {
            console.log(file.name, ':');
            console.log(chalk.red(fullName + '\u5BF9\u5E94\u7684loader\u5B9A\u4E49\u4E0D\u6B63\u786E: \u8BF7\u68C0\u67E5' + loaderPath + ', \u786E\u8BA4\u4F7F\u7528module.exports = loader\n'));
          }
        } else {
          console.log(file.name, ':');
          console.log(chalk.red(fullName + '\u4E0D\u5B58\u5728\u5BF9\u5E94\u7684loader: \u8BF7\u5728 .core-config/member/loader/ \u76EE\u5F55\u4E0B\u6DFB\u52A0\u5BF9\u5E94\u7684loader.js\u6587\u4EF6\n'));
        }
      }
    }
    if (tmpPath) fs.unlinkSync(tmpPath);
  });
  return {
    snippet: memberSnippets,
    members: members
  };
}