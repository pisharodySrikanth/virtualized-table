"use strict";

require("core-js/modules/web.url.to-json");

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _react2 = require("@testing-library/react");

require("jest-styled-components");

var _mnetUiBase = require("mnet-ui-base");

var _ = _interopRequireDefault(require(".."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('VirtualizedTable', () => {
  afterEach(_react2.cleanup);
  test('basic', () => {
    const component = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_mnetUiBase.MnetUIBase, null, /*#__PURE__*/_react.default.createElement(_.default, null)));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});