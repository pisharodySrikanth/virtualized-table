"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _mnetUiBase = require("mnet-ui-base");

var _ = require("..");

var _generateData = require("./generateData");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  headerData,
  data
} = (0, _generateData.getSimpleData)(500, 15);

const BasicVirtualizedTable = () =>
/* props */
{
  const divRef = (0, _react.useRef)(null);

  const cellRenderer = (_ref) => {
    let {
      style,
      cell,
      ref
    } = _ref;
    const {
      gridType,
      children
    } = cell;
    return /*#__PURE__*/_react.default.createElement("div", {
      style: _objectSpread(_objectSpread({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5px',
        boxSizing: 'border-box'
      }, gridType === 'header' ? {
        background: '#efefef',
        border: '1px solid #ccc'
      } : {
        border: '1px solid #ccc'
      }), style),
      ref: ref
    }, children);
  };

  return /*#__PURE__*/_react.default.createElement(_mnetUiBase.MnetUIBase, null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: '100%',
      overflow: 'auto',
      margin: 15,
      maxHeight: 500
    },
    ref: divRef
  }, /*#__PURE__*/_react.default.createElement(_.VirtualizedTable, {
    headerData: headerData,
    data: data,
    cellRenderer: cellRenderer,
    scrollContainer: divRef,
    fixedColumnCount: 2
  })));
};

(0, _react2.storiesOf)('VirtualizedTable', module).add('Basic', () => /*#__PURE__*/_react.default.createElement(BasicVirtualizedTable, null));