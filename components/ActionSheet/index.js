import React from 'react'

// [基础业务]
// import XXX from 'lodash/XXX'
// import XXX from 'constants/table/XXX.js'

// [接口定义] // file://Users/kunsam/web/order-pay-system/.assist/propType.js
import PropTypes from 'prop-types'

// [ant-design]
import Icon from 'antd/lib/icon'



// [next业务]
// import link from 'next/link' // file://Users/kunsam/web/order-pay-system/.assist/next/link.js
// import dynamic from 'next/dynamic' // file://Users/kunsam/web/order-pay-system/.assist/next/dynamic.js

import { pure, compose, withState, setDisplayName, withHandlers, setPropTypes } from 'recompose'
// [使用recompose] file://Users/kunsam/web/order-pay-system/scripts/Recompose/config.js

// [补全] help: file://Users/kunsam/web/order-pay-system/.assist/snippet.md
// [引入组件] ipcp
// [引入高阶组件] iphoc
// [引入布局] iplo
import AmountCounter from 'components/AmountCounter' // file://Users/kunsam/web/order-pay-system/components/AmountCounter/index.js

// 还要增加功能 dom生成/测试用例挂载/createComponent


const ActionSheet = ({
  onOk,
  onClose,
  versions,
  carouselList,
  activeVersion,
  setActiveVersion
}) =>
  <div className="ActionSheet">
    <style dangerouslySetInnerHTML={{ __html: require('./index.scss') }} />
    <div className="top-part">
      <div className="icon" onClick={onClose}>
        <Icon type="close-circle-o" />
      </div>
    </div>
    <div className="bottom-part">
      <p className="bottom-btn" onClick={onOk}>完成</p>
      <div className="action-sheet-container">
        <div className="content-padding">
          <Slicker slickers={carouselList} />
          <div className="info-panel">
            <h1 className="price">¥248</h1>
            <p className="basic">基础页：198元（60页）</p>
            <p className="additional">加页：50元（21页 10元/5页）</p>
          </div>

          <div className="controller">
            <div className="version">
              <p>版本</p>
              <ul className="versions">
                {
                  versions.map(ver => (
                    <li
                      key={ver}
                      onClick={() => setActiveVersion(ver)}
                      className={`version ${ver === activeVersion ? 'active' : ''}`}
                    >{ver}</li>
                  ))
                }
              </ul>
            </div>
            <div className="amount-container">
              <span className="label">购买数量</span>
              <AmountCounter defaultValue={1} />
            </div>
            <p className="tips">Tips：您还可以购买成长册送给孩子的爷爷奶奶哦</p>
          
          </div>
        </div>
      </div>
      
    </div>
  </div>



export const propTypes =  {
  list: PropTypes.arrayOf(PropTypes.shape({

    id: PropTypes.string.isRequired,

    pages: PropTypes.number.isRequired,

    optionalEnum: PropTypes.oneOf(['News', 'Photos']),

    optionalUnion: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),

  })).isRequired
}


export default compose(
  pure,
  setDisplayName('ActionSheet'),
  setPropTypes(propTypes),
  withState('activeVersion', 'setActiveVersion', ({ defaultVersion }) => defaultVersion),
  withHandlers({
    onOk: props => () => {

    }
  })
)(ActionSheet)
