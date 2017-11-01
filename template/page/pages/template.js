
import path from 'path'
import Head from '../../head'
import Container from '../../common/react/container'

export default ({ basePath, key, page, parser, container }) => {
  return (
`import React from 'react'
import WithEnv from 'hoc/WithEnv'
import { fetchData } from 'actions'
import { gql, graphql } from 'react-apollo'
import { withGraphQlReduxSaga } from 'hoc/store.js'

import WithApiStore from 'hoc/WithApiStore' // file:/${path.join(basePath, 'hoc/WithApiStore/index.js')}
import AppLayout from 'layouts/AppLayout' // file:/${path.join(basePath, 'layouts/AppLayout/index.js')}
import ${parser.key} from 'parsers/${parser.importPath}' // file:/${parser.absolutePath}

// [container] // file:/${container.absolutePath}

const WithApiStoreParser = WithApiStore(
  ${parser.key},
  // [查看可配置的请求]  // file:/${path.join(basePath, 'api/_apiMap.js')}
  []
)

const ${page.key} = ({
  // 在这取出 getInitialProps 中 return 的数据 然后传给 WithApiStoreParser
  isServer,
  isMobile
}) => (
  <AppLayout isServer={isServer} isMobile={isMobile}>
    <WithApiStoreParser />
  </AppLayout>
)

// [props对象] file:/${path.join(basePath, '.assist/next/total.js')}
${page.key}.getInitialProps = async (props) => {

  // [数据不存在则抓取] snippet: sls{api.shortcut} + dp{api.shortcut}
  // if (!fetchGetCommentsSuccess(props.store.getState())) {
  //   props.store.dispatch(fetchData({
  //     key: 'fetchGetComments',
  //     payload: {
  //       postId: 1, //  必填参数,
  //     }
  //   }))
  // }

  return {
    ...WithEnv(props)
  }
}

export default withGraphQlReduxSaga(${page.key}) // 在这使用graphQl业务
`)
}





