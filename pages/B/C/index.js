import React from 'react'
import WithEnv from 'hoc/WithEnv'
import { fetchData } from 'actions'
import { gql, graphql } from 'react-apollo'
import { withGraphQlReduxSaga } from 'hoc/store.js'

import WithApiStore from 'hoc/WithApiStore' // file://Users/kunsam/Desktop/project/npm/core-script/hoc/WithApiStore/index.js
import AppLayout from 'layouts/AppLayout' // file://Users/kunsam/Desktop/project/npm/core-script/layouts/AppLayout/index.js
import BCParser from 'parsers/parsers//B/C' // file://Users/kunsam/Desktop/project/npm/core-script/parsers/B/C/index.js

// [container] // file://Users/kunsam/Desktop/project/npm/core-script/containers/B/C/index.js

const WithApiStoreParser = WithApiStore(
  BCParser,
  // [查看可配置的请求]  // file://Users/kunsam/Desktop/project/npm/core-script/api/_apiMap.js
  []
)

const BCPage = ({
  // 在这取出 getInitialProps 中 return 的数据 然后传给 WithApiStoreParser
  isServer,
  isMobile
}) => (
  <AppLayout isServer={isServer} isMobile={isMobile}>
    <WithApiStoreParser />
  </AppLayout>
)

// [props对象] file://Users/kunsam/Desktop/project/npm/core-script/.assist/next/total.js
BCPage.getInitialProps = async (props) => {

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

export default withGraphQlReduxSaga(BCPage) // 在这使用graphQl业务
