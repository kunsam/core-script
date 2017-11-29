
import path from 'path'
import Head from '../../head'
import Container from '../../common/react/container'

export default ({ basePath, key, page, parser, container }) => {
  return (
`import React from 'react'

import { fetchData } from 'actions'
// import nodeFetch from 'utils/fetch' // 直接请求数据
// import { gql, graphql } from 'react-apollo'
// import errorConstant from 'constants/error'

import WithEnv from 'hoc/WithEnv'
import WithApp from 'hoc/WithApp'
import WithApiStore from 'hoc/WithApiStore'
import { withGraphQlReduxSaga } from 'hoc/store.js'


import ${parser.key} from '${parser.importPath}'
// [parser] // file:/${parser.absolutePath}
// [container] // file:/${container.absolutePath}

const ${page.key} = WithApp(WithApiStore(
  {
    parser: ${parser.key},
    // [查看可配置的请求] file:/${path.join(basePath, 'api/_apiMap.js')}
    clientDispatch: [],
    // 服务端调用的api
    serverDispatch: [],
  }
))

// [props对象] file:/${path.join(basePath, 'assist/next/total.js')}
${page.key}.getInitialProps = async (props) => {

  let error = {}
  if (!props.query.xxx) {
    // error.statusCode = 900
  }

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
    // serverDispath: ['fetchGetComments'],
    ...WithEnv(props)
  }
}

export default withGraphQlReduxSaga(${page.key}) // 在这使用graphQl业务
`)
}





