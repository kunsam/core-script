
import PropTypes from '../../common/react/propType'
import Basic from '../../common/basic'
import Recompose from '../../npm/recompose'

export default ({ basePath, key, containerPath, containerAbsolutePath }) => {
  return (
`
${PropTypes()}
${Basic()}
${Recompose()}
// [引入action]
// import { addCount } from 'actions'

import ${key}Container from 'containers/${containerPath}' // file:/${containerAbsolutePath}

// [引入selectors】 snippet: ipsl{api.shortcut}r
// import { fetchGetPostSuccess } from 'selectors/list/fetchGetPost.js'

// [引入graphQl业务] sinppet: iphoc
// import WithAllReviews from 'hoc/WithAllReviews'

export default compose(
  pure,
  mapProps(props => {
    // console.log(props, '${key}Parser');
    return props
  }),
)(${key}Container)
`)
}





