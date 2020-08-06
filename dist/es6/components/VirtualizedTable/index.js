"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VirtualizedTable = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactVirtualized = require("react-virtualized");

var _ScrollHandler = _interopRequireDefault(require("./ScrollHandler"));

var _style = require("./style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var VirtualizedTable = /*#__PURE__*/(0, _react.forwardRef)(function (props, componentRef) {
  var columnCount = props.data.length ? props.data[0].length : 0;
  return /*#__PURE__*/_react["default"].createElement(_reactVirtualized.AutoSizer, {
    disableHeight: true
  }, function (_ref) {
    var width = _ref.width;
    return /*#__PURE__*/_react["default"].createElement(_reactVirtualized.ColumnSizer, {
      columnMinWidth: props.minColumnWidth,
      columnCount: columnCount,
      width: width
    }, function (_ref2) {
      var adjustedWidth = _ref2.adjustedWidth,
          columnWidth = _ref2.columnWidth,
          registerChild = _ref2.registerChild;
      return /*#__PURE__*/_react["default"].createElement(_ScrollHandler["default"], {
        scrollContainer: props.scrollContainer.current,
        width: width,
        data: props.data,
        totalColumnWidth: columnWidth * columnCount,
        ref: componentRef
      }, function (_ref3) {
        var scrollTop = _ref3.scrollTop,
            scrollLeft = _ref3.scrollLeft,
            isScrolling = _ref3.isScrolling,
            gridRef = _ref3.gridRef,
            headerRef = _ref3.headerRef,
            onScroll = _ref3.onScroll,
            height = _ref3.height;
        return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_style.StyledHeader, {
          className: "virtualized-table-header",
          data: props.headerData,
          cellRenderer: props.cellRenderer,
          autoHeight: true,
          width: adjustedWidth,
          columnWidth: columnWidth,
          type: "header",
          ref: headerRef,
          minRowHeight: props.minRowHeight,
          scrollLeft: scrollLeft,
          isScrolling: isScrolling,
          onScroll: onScroll,
          height: height
        }), /*#__PURE__*/_react["default"].createElement(_style.StyledBody, {
          className: "virtualized-table-body",
          data: props.data,
          cellRenderer: props.cellRenderer,
          autoHeight: true,
          scrollTop: scrollTop,
          registerGrid: registerChild,
          columnWidth: columnWidth,
          width: adjustedWidth,
          type: "body",
          minRowHeight: props.minRowHeight,
          ref: gridRef,
          scrollLeft: scrollLeft,
          isScrolling: isScrolling,
          onScroll: onScroll,
          height: height
        }));
      });
    });
  });
});
VirtualizedTable.displayName = 'VirtualizedTable';
VirtualizedTable.propTypes = {
  cellRenderer: _propTypes["default"].func.isRequired,
  headerData: _propTypes["default"].array,
  data: _propTypes["default"].array.isRequired,
  scrollContainer: _propTypes["default"].object.isRequired,
  minRowHeight: _propTypes["default"].number,
  minColumnWidth: _propTypes["default"].number
};
VirtualizedTable.defaultProps = {
  minRowHeight: 50,
  minColumnWidth: 120,
  headerData: []
};
var VirtualizedTableDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  VirtualizedTableDoc = require('./doc').doc(VirtualizedTable);
}

var VirtualizedTableWrapper = VirtualizedTableDoc || VirtualizedTable;
exports.VirtualizedTable = VirtualizedTableWrapper;