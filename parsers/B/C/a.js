

// [接口定义] // file://Users/kunsam/Desktop/project/npm/core-script/.assist/propType.js
import PropTypes from 'prop-types'

// [基础业务]
// import XXX from 'lodash/XXX'
// import XXX from 'constants/table/XXX.js'

// [使用recompose] <core rcp>
import {
  pure,
  compose,
  mapProps,
  setDisplayName
} from 'recompose'

// [引入action]
// import { addCount } from 'actions'

import BCAContainer from 'containers/containers/B/C/A' // file://Users/kunsam/Desktop/project/npm/core-script/containers/B/C/A/index.js

// [引入selectors】 snippet: ipsl{api.shortcut}r
// import { fetchGetPostSuccess } from 'selectors/list/fetchGetPost.js'

// [引入graphQl业务] sinppet: iphoc
// import WithAllReviews from 'hoc/WithAllReviews'

// [page] // file://Users/kunsam/Desktop/project/npm/core-script/pages/B/C/a.js
// [container] // file://Users/kunsam/Desktop/project/npm/core-script/containers/B/C/A/index.js

export default compose(
  pure,
  mapProps(props => {
    // console.log(props, 'BCAParser');
    return props
  }),
)(BCAContainer)
