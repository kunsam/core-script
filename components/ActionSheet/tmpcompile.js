'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = {};

var _react2 = _interopRequireDefault(_react);

var _propTypes = {};

var _propTypes2 = _interopRequireDefault(_propTypes);

var _icon = {};

var _icon2 = _interopRequireDefault(_icon);

var _recompose = {};

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// [使用recompose] file://Users/kunsam/web/order-pay-system/scripts/Recompose/config.js

// [补全] help: file://Users/kunsam/web/order-pay-system/.assist/snippet.md
// [引入组件] ipcp
// [引入高阶组件] iphoc
// [引入布局] iplo


// [ant-design]
var ActionSheet = function ActionSheet(_ref) {
  var onOk = _ref.onOk,
      onClose = _ref.onClose,
      versions = _ref.versions,
      carouselList = _ref.carouselList,
      activeVersion = _ref.activeVersion,
      setActiveVersion = _ref.setActiveVersion;
  return _react2.default.createElement('div', { className: 'ActionSheet' }, _react2.default.createElement('style', { dangerouslySetInnerHTML: { __html: {} } }), _react2.default.createElement('div', { className: 'top-part' }, _react2.default.createElement('div', { className: 'icon', onClick: onClose }, _react2.default.createElement(_icon2.default, { type: 'close-circle-o' }))), _react2.default.createElement('div', { className: 'bottom-part' }, _react2.default.createElement('p', { className: 'bottom-btn', onClick: onOk }, '\u5B8C\u6210'), _react2.default.createElement('div', { className: 'action-sheet-container' }, _react2.default.createElement('div', { className: 'content-padding' }, _react2.default.createElement(Slicker, { slickers: carouselList }), _react2.default.createElement('div', { className: 'info-panel' }, _react2.default.createElement('h1', { className: 'price' }, '\xA5248'), _react2.default.createElement('p', { className: 'basic' }, '\u57FA\u7840\u9875\uFF1A198\u5143\uFF0860\u9875\uFF09'), _react2.default.createElement('p', { className: 'additional' }, '\u52A0\u9875\uFF1A50\u5143\uFF0821\u9875 10\u5143/5\u9875\uFF09')), _react2.default.createElement('div', { className: 'controller' }, _react2.default.createElement('div', { className: 'version' }, _react2.default.createElement('p', null, '\u7248\u672C'), _react2.default.createElement('ul', { className: 'versions' }, versions.map(function (ver) {
    return _react2.default.createElement('li', {
      key: ver,
      onClick: function onClick() {
        return setActiveVersion(ver);
      },
      className: 'version ' + (ver === activeVersion ? 'active' : '')
    }, ver);
  }))), _react2.default.createElement('div', { className: 'amount-container' }, _react2.default.createElement('span', { className: 'label' }, '\u8D2D\u4E70\u6570\u91CF'), _react2.default.createElement(AmountCounter, { defaultValue: 1 })), _react2.default.createElement('p', { className: 'tips' }, 'Tips\uFF1A\u60A8\u8FD8\u53EF\u4EE5\u8D2D\u4E70\u6210\u957F\u518C\u9001\u7ED9\u5B69\u5B50\u7684\u7237\u7237\u5976\u5976\u54E6'))))));
};

// [next业务]
// import link from 'next/link' // file://Users/kunsam/web/order-pay-system/.assist/next/link.js
// import dynamic from 'next/dynamic' // file://Users/kunsam/web/order-pay-system/.assist/next/dynamic.js

// [基础业务]
// import XXX from 'lodash/XXX'
// import XXX from 'constants/table/XXX.js'

// [接口定义] // file://Users/kunsam/web/order-pay-system/.assist/propType.js
exports.default = (0, _recompose.compose)(_recompose.pure, (0, _recompose.setDisplayName)('ActionSheet'), (0, _recompose.withState)('activeVersion', 'setActiveVersion', function (_ref2) {
  var defaultVersion = _ref2.defaultVersion;
  return defaultVersion;
}), (0, _recompose.withHandlers)({
  onOk: function onOk(props) {
    return function () {};
  }
}))(ActionSheet);
