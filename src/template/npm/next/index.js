import path from 'path'
import config from '../../../src/config'
import templateConfig from '../../config'

export default () => `
// [next业务] https://github.com/zeit/next.js/
// import Link from 'next/link' // file:/${path.join(config.pkgBasePath, templateConfig.next.link)}
// import dynamic from 'next/dynamic' // file:/${path.join(config.pkgBasePath, templateConfig.next.dynamic)}
`