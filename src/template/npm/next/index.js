import path from 'path'
import templateConfig from '../../config'
import { PACKAGE_BASE_PATH } from '../../../src.config'

export default () => `
// [next业务] https://github.com/zeit/next.js/
// import Link from 'next/link' // file:/${path.join(PACKAGE_BASE_PATH, templateConfig.next.link)}
// import dynamic from 'next/dynamic' // file:/${path.join(PACKAGE_BASE_PATH, templateConfig.next.dynamic)}
`