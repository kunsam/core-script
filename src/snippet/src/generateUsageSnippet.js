const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const find = require('lodash/find')
const shell = require('shelljs')
const toLower = require('lodash/toLower')
const escapeRegExp = require('lodash/escapeRegExp')

export default function generateUsageSnippet(joinedFiles, config, member) {
  const removeFolder = joinedFiles.filter(file => file.type !== 'folder')
  let memberSnippets = {}
  let members = []
  removeFolder.forEach(file => {
    let tmpPath = ''
    const fullName = `${file.importPath}${file.name === 'index.js' ? '/index.js' : ''}` 
    const findRuleMatchFile = find(config.snippet.usage.rules, rule => rule.test.test(file.name))
    if (findRuleMatchFile) { // 匹配正则表达式
      const findInExclude = find(findRuleMatchFile.exclude || [], ex => (
        ex.match(/(\d|\w){1}.+(\d|\w){1}$/).length && ex.match(/(\d|\w){1}.+(\d|\w){1}$/))[0] === fullName
      )
      if (!findInExclude) { // 不在exclude里的file
        const defaultLoaderPath = path.join(__dirname, `../loader/snippet/${config.editor}/${config.frontLang}/${findRuleMatchFile.use}.js`)
        // 先检测是否有用户自定义的该loader
        const userLoaderPath = path.join(config.projectPath, `.core-config/member/loader/${findRuleMatchFile.use}.js`)
        const loaderPath = fs.existsSync(userLoaderPath) ? userLoaderPath : (fs.existsSync(defaultLoaderPath) ? defaultLoaderPath : null)
        if (loaderPath) {
          const loader = require(loaderPath)
          if (typeof(loader) === 'function') { // 过滤掉空文件
            file.absolutePath = path.join(config.projectPath, `./${member.path}/${file.importPath}`)
            let component = { descrition: '该文件非Js文件，没有引入实体', default: null } 
            if (file.name.split('.') && file.name.split('.')[1] === 'js') { // js文件引入文件内容
              if (file.importPath) {
                if (file.name === 'index.js') file.absolutePath = path.join(file.absolutePath, './index.js')
                const tmpFile = fs.readFileSync(file.absolutePath, 'utf-8')
                                  .replace(/require\(.+\)/g, '{}')
                tmpPath = path.join(file.absolutePath, '../', `./tmp.js`)
                fs.writeFileSync(tmpPath, tmpFile)
                shell.exec(`babel ${tmpPath} --out-file ${path.join(file.absolutePath, '../', `./tmpcompile.js`)} --presets=es2015,react`)
                try {
                  component = require(tmpPath)
                } catch (e) {
                  console.log(chalk.red(`${file.absolutePath} 暂时无法解析 ${e} \n`));
                  component = {}
                }
              }
            }
            if (component && component.default) {
              file.root = `${member.path}/`
              // ------------------------------------
              // 补全的快捷键核心定义
              // ------------------------------------
              const matchDisplayname = component.default.displayName.match(/\(((\w)*?)\)/g)
              const displayName = matchDisplayname.length && matchDisplayname[0].replace(/\(|\)/g, '')
              const memeberShortcut  = member.shortcut || toLower(`${member.path.slice(0, 1)}${member.path.slice(member.path.length - 1)}`)
              file.snippetPrefix = `${config.snippet.usage.modeShortcut || 'use'}${memeberShortcut}${file.shortcut}`
              const snippet = loader({
                componentObj: file,
                component: { displayName, propTypes: component.default.propTypes },
                filePath: file.absolutePath
              })
              if (snippet) {
                // 这里使用了recompose displayName 字段 看看有没有多种情况
                memberSnippets[`use ${member.path} ${displayName || file.importName}`] = snippet
                members.push(file)
                console.log(chalk.cyan(`得到了${member.path} -> ${fullName}的组件使用补全`))
              }
            }
          } else {
            console.log(file.name, ':');
            console.log(chalk.red(`${fullName}对应的loader定义不正确: 请检查${loaderPath}, 确认使用module.exports = loader`));
          }
        } else {
          console.log(file.name, ':');
          console.log(chalk.red(`${fullName}不存在对应的loader: 请在 .core-config/member/loader/ 目录下添加对应的loader.js文件`));
        }
      }
    }
    if(fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath)
  })
  return {
    snippet: memberSnippets,
    members: members
  }
}
