"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VirtualizedTable = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactVirtualized = require("react-virtualized");

var _ScrollHandler = _interopRequireDefault(require("./ScrollHandler"));

var _style = require("./style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const VirtualizedTable = /*#__PURE__*/(0, _react.forwardRef)((props, componentRef) => {
  const columnCount = props.data.length ? props.data[0].length : 0;
  return /*#__PURE__*/_react.default.createElement(_reactVirtualized.AutoSizer, {
    disableHeight: true
  }, (_ref) => {
    let {
      width
    } = _ref;
    return /*#__PURE__*/_react.default.createElement(_reactVirtualized.ColumnSizer, {
      columnMinWidth: props.minColumnWidth,
      columnCount: columnCount,
      width: width
    }, (_ref2) => {
      let {
        adjustedWidth,
        columnWidth,
        registerChild
      } = _ref2;
      return /*#__PURE__*/_react.default.createElement(_ScrollHandler.default, {
        scrollContainer: props.scrollContainer.current,
        width: width,
        data: props.data,
        totalColumnWidth: columnWidth * columnCount,
        ref: componentRef
      }, (_ref3) => {
        let {
          scrollTop,
          scrollLeft,
          isScrolling,
          gridRef,
          headerRef,
          onScroll,
          height
        } = _ref3;
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_style.StyledHeader, {
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
        }), /*#__PURE__*/_react.default.createElement(_style.StyledBody, {
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
  cellRenderer: _propTypes.default.func.isRequired,
  headerData: _propTypes.default.array,
  data: _propTypes.default.array.isRequired,
  scrollContainer: _propTypes.default.object.isRequired,
  minRowHeight: _propTypes.default.number,
  minColumnWidth: _propTypes.default.number
};
VirtualizedTable.defaultProps = {
  minRowHeight: 50,
  minColumnWidth: 120,
  headerData: []
};
let VirtualizedTableDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  VirtualizedTableDoc = require('./doc').doc(VirtualizedTable);
}

const VirtualizedTableWrapper = VirtualizedTableDoc || VirtualizedTable;
exports.VirtualizedTable = VirtualizedTableWrapper;