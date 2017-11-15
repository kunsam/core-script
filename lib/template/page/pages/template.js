'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _head = require('../../head');

var _head2 = _interopRequireDefault(_head);

var _container = require('../../common/react/container');

var _container2 = _interopRequireDefault(_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var basePath = _ref.basePath,
      key = _ref.key,
      page = _ref.page,
      parser = _ref.parser,
      container = _ref.container;

  return 'import React from \'react\'\nimport WithEnv from \'hoc/WithEnv\'\nimport { fetchData } from \'actions\'\nimport { gql, graphql } from \'react-apollo\'\nimport { withGraphQlReduxSaga } from \'hoc/store.js\'\n\nimport WithApiStore from \'hoc/WithApiStore\' // file:/' + _path2.default.join(basePath, 'hoc/WithApiStore/index.js') + '\nimport AppLayout from \'layouts/AppLayout\' // file:/' + _path2.default.join(basePath, 'layouts/AppLayout/index.js') + '\nimport ' + parser.key + ' from \'' + parser.importPath + '\' // file:/' + parser.absolutePath + '\n\n// [container] // file:/' + container.absolutePath + '\n\nconst WithApiStoreParser = WithApiStore(\n  ' + parser.key + ',\n  // [\u67E5\u770B\u53EF\u914D\u7F6E\u7684\u8BF7\u6C42]  // file:/' + _path2.default.join(basePath, 'api/_apiMap.js') + '\n  []\n)\n\nconst ' + page.key + ' = ({\n  // \u5728\u8FD9\u53D6\u51FA getInitialProps \u4E2D return \u7684\u6570\u636E \u7136\u540E\u4F20\u7ED9 WithApiStoreParser\n  isServer,\n  isMobile\n}) => (\n  <AppLayout isServer={isServer} isMobile={isMobile}>\n    <WithApiStoreParser />\n  </AppLayout>\n)\n\n// [props\u5BF9\u8C61] file:/' + _path2.default.join(basePath, 'assist/next/total.js') + '\n' + page.key + '.getInitialProps = async (props) => {\n\n  // [\u6570\u636E\u4E0D\u5B58\u5728\u5219\u6293\u53D6] snippet: sls{api.shortcut} + dp{api.shortcut}\n  // if (!fetchGetCommentsSuccess(props.store.getState())) {\n  //   props.store.dispatch(fetchData({\n  //     key: \'fetchGetComments\',\n  //     payload: {\n  //       postId: 1, //  \u5FC5\u586B\u53C2\u6570,\n  //     }\n  //   }))\n  // }\n\n  return {\n    // serverDispath: [\'fetchGetComments\'],\n    ...WithEnv(props)\n  }\n}\n\nexport default withGraphQlReduxSaga(' + page.key + ') // \u5728\u8FD9\u4F7F\u7528graphQl\u4E1A\u52A1\n';
};