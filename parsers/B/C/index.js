

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

import BCContainer from 'containers/containers//B/C' // file://Users/kunsam/Desktop/project/npm/core-script/containers/B/C/index.js

// [引入selectors】 snippet: ipsl{api.shortcut}r
// import { fetchGetPostSuccess } from 'selectors/list/fetchGetPost.js'

// [引入graphQl业务] sinppet: iphoc
// import WithAllReviews from 'hoc/WithAllReviews'

// [page] // file://Users/kunsam/Desktop/project/npm/core-script/pages/B/C/index.js
// [container] // file://Users/kunsam/Desktop/project/npm/core-script/containers/B/C/index.js

export default compose(
  pure,
  mapProps(props => {
    // console.log(props, 'BCParser');
    return props
  }),
)(BCContainer)
