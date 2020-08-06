"use strict";

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactVirtualized = require("react-virtualized");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const generateArr = n => [...Array(n).keys()];

const getMaxSum = (generator, x) => generateArr(x).reduce((sum, i) => sum + generator(i), 0);

const CellMeasureWrapper = (_ref) => {
  let {
    rowSpan,
    colSpan,
    children,
    cellRenderer,
    rendererProps
  } = _ref,
      props = _objectWithoutProperties(_ref, ["rowSpan", "colSpan", "children", "cellRenderer", "rendererProps"]);

  const initializeStyle = () => {
    if (rowSpan === 1 && colSpan === 1) {
      return {};
    }

    const {
      parent: {
        props: {
          columnWidth
        }
      },
      rowIndex,
      cache
    } = props;

    const rowGenerator = row => cache.rowHeight({
      index: rowIndex + row
    });

    const rowSpanStyle = rowSpan === 1 ? {} : {
      height: getMaxSum(rowGenerator, rowSpan)
    };
    const colSpanStyle = colSpan === 1 ? {} : {
      width: columnWidth * colSpan
    };
    return _objectSpread(_objectSpread(_objectSpread({}, rowSpanStyle), colSpanStyle), {}, {
      zIndex: 1
    });
  };

  const style = initializeStyle();
  return (
    /*#__PURE__*/
    // eslint-disable-next-line react/jsx-props-no-spreading
    _react.default.createElement(_reactVirtualized.CellMeasurer, props, (_ref2) => {
      let {
        registerChild
      } = _ref2;
      return cellRenderer(_objectSpread(_objectSpread({}, rendererProps), {}, {
        style: _objectSpread(_objectSpread({}, rendererProps.style), style),
        ref: registerChild
      }));
    })
  );
};

CellMeasureWrapper.propTypes = {
  rowSpan: _propTypes.default.number,
  colSpan: _propTypes.default.number,
  parent: _propTypes.default.object.isRequired,
  rowIndex: _propTypes.default.number.isRequired,
  columnIndex: _propTypes.default.number.isRequired,
  cache: _propTypes.default.instanceOf(_reactVirtualized.CellMeasurerCache).isRequired,
  children: _propTypes.default.node.isRequired,
  cellRenderer: _propTypes.default.func.isRequired,
  rendererProps: _propTypes.default.object.isRequired
};
CellMeasureWrapper.defaultProps = {
  rowSpan: 1,
  colSpan: 1
};
var _default = CellMeasureWrapper;
exports.default = _default;