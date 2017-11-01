

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const upperFirst = require('lodash/upperFirst')
const lowerFirst = require('lodash/lowerFirst')
const toLower = require('lodash/toLower')
import { uniqueStringArray } from './array'


const ignoreFile = {
  name: {
    '__tests__': true,
    '.DS_Store': true
  },
  path: {
    'x/xxx': true
  }  
}

export function getFilesTree(filePath) {
  let merge = []
  if (!fs.existsSync(filePath)) {
    console.log(chalk.red(
      '----------------------------------------------------------\n',
      `不存在该成员路径：${filePath}\n`,
      '----------------------------------------------------------\n'
    ));
    throw Error('error occur')
  } else {
    const files = fs.readdirSync(filePath) || []
    files.forEach(dir => {
      const dirPath = path.join(filePath, dir)
      if (!(ignoreFile.name[dir] || ignoreFile.path[dirPath])) {
        const children = fs.statSync(dirPath).isDirectory() ? getFilesTree(dirPath) : []
        merge.push({
          name: dir,
          type: fs.statSync(dirPath).isDirectory() ? 'folder' : 'file',
          path: filePath,
          children: children
        })
      }
    })
  }
  return merge
}


export function joinFilesName (filestree) {
  if (!filestree.length) return []
  // 过滤掉不存在子元素的文件夹
  const filterdTree = filestree
    .filter(file => !(file.type === 'folder' && !file.children.length))
  let output = []
  filterdTree.forEach(f => {
    const chilrenJoined = joinFilesName(f.children)
    if (!chilrenJoined.length) {
      return output.push({
        name: f.name,
        type: f.type,
        importName: f.name === 'index.js' ? '' : upperFirst(f.name.split('.')[0]),
        importPath: f.name === 'index.js' ? '' : f.name,
        fullImportPath: f.name,
        shortcut: f.name === 'index.js' ? '' : toLower(f.name.slice(0, 1)),
        description: f.name
      })
    }
    chilrenJoined.forEach(child => {
      output.push({
        name: child.name,
        importName: upperFirst(f.name) + child.importName || '',
        importPath: f.name + (child.importPath ? `/${child.importPath}` : ''),
        fullImportPath: f.name + '/' + child.fullImportPath,
        shortcut: toLower(f.name.slice(0, 1)) + child.shortcut,
        description: f.name + ' -> ' + child.description
      })
    })
  })
  return output
}

export function uniqueShorcutNames (filestree) {
  const filesNames = joinFilesName(filestree)
  const uniqueShortcut = uniqueStringArray(filesNames.map(j => j.shortcut))
  const uniqueKey = uniqueStringArray(filesNames.map(j => j.importName))
  return filesNames.map((f, i) => {
    f.shortcut = uniqueShortcut[i]
    f.key = uniqueKey[i]
    return f
  })
}
