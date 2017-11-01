import React from 'react'

// [接口定义] // file://Users/kunsam/web/order-pay-system/.assist/propType.js
import PropTypes from 'prop-types'

// [基础业务]
// import XXX from 'lodash/XXX'
// import XXX from 'constants/table/XXX.js'

// [ant-design] // https://ant.design/components/icon-cn/
// import Button from 'antd/lib/button'

// [next业务]
// import Link from 'next/link' // file://Users/kunsam/web/order-pay-system/.assist/next/link.js
// import dynamic from 'next/dynamic' // file://Users/kunsam/web/order-pay-system/.assist/next/dynamic.js

// [使用recompose] <core rcp>
import {
  pure,
  compose,
  setDisplayName
} from 'recompose'

// [补全] help: file://Users/kunsam/web/order-pay-system/.assist/snippet.md
// [引入组件] ipcp [引入高阶组件] iphoc [引入布局] iplo
// [创建元件请配置] <core ccp>

const ZXLayouts = ({

}) =>
  <div className="ZXLayouts">
    <style dangerouslySetInnerHTML={{ __html: require('./index.scss') }} />
  </div>

export default compose(
  pure,
  setDisplayName('ZXLayouts')
)(ZXLayouts)
