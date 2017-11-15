var upperFirst = require('lodash/upperFirst')

export function getPagePath (path) {
  if (!path) throw Error('不存在该path')
  let result = path.split('/').map(p => (p.indexOf('.') <= 0 && upperFirst(p)) || p)
  if (result[result.length - 1].indexOf('.') <= 0) {
    result.push('index.js')
  }
  return result.join('/')
}