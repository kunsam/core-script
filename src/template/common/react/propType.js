import path from 'path'
import config from '../../../config'
import templateConfig from '../../config'


export default () => `
// [接口定义] // file:/${path.join(config.pkgBasePath, templateConfig.propType)}
import PropTypes from 'prop-types'
`