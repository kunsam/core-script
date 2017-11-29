
import PropTypes from '../../common/react/propType'
import Basic from '../../common/basic'
import Recompose from '../../npm/recompose'

export default ({ basePath, page, parser, container }) => {
  return (
`
${PropTypes()}
${Basic()}
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
${Recompose()}
// [引入action]
// import { addCount } from 'actions'

import ${container.key} from '${container.importPath}' // file:/${container.absolutePath}

// [引入selectors】 snippet: ipsl{api.shortcut}r
// import { fetchGetPostSuccess } from 'selectors/list/fetchGetPost.js'

// [引入graphQl业务] sinppet: iphoc
// import WithAllReviews from 'hoc/WithAllReviews'

// [page] // file:/${page.absolutePath}
// [container] // file:/${container.absolutePath}

export default compose(
  pure,
  mapProps(props => {
    // console.log(props, '${parser.key}');
    return props
  }),
)(${container.key})
`)
}





