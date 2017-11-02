import path from 'path'
import config from '../../../config'
import templateConfig from '../../config'

// todo 后期快捷键配置绑定在这

export default () => `
// [创建元件请配置] <core ccp>
// [补全] file:/${path.join(config.pkgBasePath, templateConfig.snippet.help)}
// [引入组件] ipcp [引入高阶组件] iphoc [引入布局] iplo
`