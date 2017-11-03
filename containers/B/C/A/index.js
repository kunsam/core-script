
import React from 'react'

// [接口定义] // file://Users/kunsam/Desktop/project/npm/core-script/.assist/propType.js
import PropTypes from 'prop-types'

// [基础业务]
// import XXX from 'lodash/XXX'
// import XXX from 'constants/table/XXX.js'

// [ant-design] // https://ant.design/components/icon-cn/
// import Button from 'antd/lib/button'


// [next业务] https://github.com/zeit/next.js/
// import Link from 'next/link' // file://Users/kunsam/Desktop/project/npm/core-script/.assist/next/link.js
// import dynamic from 'next/dynamic' // file://Users/kunsam/Desktop/project/npm/core-script/.assist/next/dynamic.js


// [使用recompose] <core rcp>
import {
  pure,
  compose,
  mapProps,
  setDisplayName
} from 'recompose'


// [创建元件请配置] <core ccp>
// [补全] file://Users/kunsam/Desktop/project/npm/core-script/.assist/snippet.md
// [引入组件] ipcp [引入高阶组件] iphoc [引入布局] iplo

import SaZ from '../../../../components/Sa/Z' // file://Users/kunsam/Desktop/project/npm/core-script/components/Sa/Z/index.js

// [page] // file://Users/kunsam/Desktop/project/npm/core-script/pages/B/C/a.js
// [parser] // file://Users/kunsam/Desktop/project/npm/core-script/parsers/B/C/a.js

const BCAContainer = ({
  
}) => (
  <div className="BCAContainer">
    <style dangerouslySetInnerHTML={{ __html: require('./index.scss') }} />
  </div>
)

export default compose(
  pure,
  mapProps(props => {
    // console.log(props, 'BCAContainer');
    return props
  }),
  setDisplayName('BCAContainer')
)(BCAContainer)

