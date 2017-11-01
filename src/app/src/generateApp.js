
var fs = require('fs-extra')
var path = require('path')
var chalk = require('chalk')
var upperFirst = require('lodash/upperFirst')

const TEMPLATE_PATH = path.join(__dirname, '../../../template')

export default (basePath, pagePath) => {

  let data = {
    page: {
      path: '',
      absolutePath: '',
      file: null
    },
    parser: {
      path: '',
      absolutePath: '',
      file: null
    },
    container: {
      path: '',
      absolutePath: '',
      file: null
    }
  }

  let splitPaths = pagePath.split('/')
  const containerDirPaths = splitPaths.map(a => upperFirst(a).replace(/\s/g, '').replace('.js', ''))
  let lastPath = splitPaths.pop()
  let dirPaths = splitPaths.map(a => a.replace(/\s/g, '') && upperFirst(a))
  if (lastPath.indexOf('.') <= 0) { // 没有 .
    dirPaths.push(upperFirst(lastPath).replace(/\s/g, ''))
    lastPath = 'index.js'
  }
  const importPath = `${dirPaths.join('/')}${lastPath === 'index.js' ? '' : `/${lastPath}`}`

  data.page.path = `pages/${importPath}`
  data.page.absolutePath = path.join(basePath, `pages/${importPath}${lastPath !== 'index.js' ? '' : `/${lastPath}`}`)
  data.parser.path = `parsers/${importPath}`
  data.parser.absolutePath = path.join(basePath, `parsers/${importPath}${lastPath !== 'index.js' ? '' : `/${lastPath}`}`)
  data.container.path = `containers/${containerDirPaths.join('/')}`
  data.container.absolutePath = path.join(basePath, `containers/${containerDirPaths.join('/')}/index.js`)
  
  const key = importPath.split('/').map(a => upperFirst(a).replace(/\s/g, '').replace('.js', '')).join('')
  const containerKey =  containerDirPaths.join('')

  const getPage = require(`${TEMPLATE_PATH}/page/pages/template.js`).default
  const getParser = require(`${TEMPLATE_PATH}/page/parsers/template.js`).default
  const getContainer= require(`${TEMPLATE_PATH}/page/containers/template.js`).default

  data.page.file = getPage({
    basePath,
    key: `${key}Page`,
    parserPath: data.parser.path,
    parserAbsolutePath: data.parser.absolutePath
  })
  data.parser.file = getParser({
    basePath,
    key,
    containerPath: data.container.path,
    containerAbsolutePath: data.container.absolutePath
  })
  data.container.file = getContainer({
    basePath,
    key: `${containerKey}Container`,
    parserAbsolutePath: data.parser.absolutePath
  })
  for (let [name, value] of Object.entries(data)) {
    if (fs.existsSync(value.absolutePath)) {
      console.log(chalk.red(`>>> [${value.absolutePath}] 已存在，如要更新请删除`));
    } else {
      fs.ensureFileSync(value.absolutePath)
      fs.writeFile(value.absolutePath, value.file, () => {
        console.log(chalk.yellow(`>>> [${value.absolutePath}] 成功生成`));
      })
    }
  }
}