"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertDummyCells = insertDummyCells;
exports.defaultCellRenderer = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var generateDummy = function generateDummy(_ref) {
  var parent = _ref.parent,
      index = _ref.index,
      totalDummies = _ref.totalDummies,
      dummyFor = _ref.dummyFor,
      gridType = _ref.gridType;
  var style = {};
  var first = index === 0;
  var last = index === totalDummies - 1;

  if (dummyFor === 'colSpan') {
    style.borderLeft = 0;

    if (!last) {
      style.borderRight = 0;
    }
  } else {
    style.borderTop = 0;

    if (!last) {
      style.borderBottom = 0;
    }
  }

  return _objectSpread(_objectSpread({}, parent), {}, {
    colSpan: 1,
    rowSpan: 1,
    children: '',
    dummy: true,
    dummyFor: dummyFor,
    first: first,
    last: last,
    gridType: gridType,
    style: _objectSpread(_objectSpread({}, parent.style), style)
  });
};

var dummyBuffer = {
  init: function init() {
    this.buffer = new Map();
  },
  extract: function extract(index, gridType) {
    var buffer = this.buffer;
    var arr = [];

    if (!buffer.has(index) || buffer.get(index).length === 0) {
      return arr;
    }

    buffer.get(index).forEach(function (item) {
      if (!item.remainingRows) {
        return;
      }

      arr.push(generateDummy({
        parent: item.parent,
        totalDummies: item.parent.rowSpan - 1,
        index: item.parent.rowSpan - 1 - item.remainingRows,
        dummyFor: 'rowSpan',
        gridType: gridType
      })); // eslint-disable-next-line no-param-reassign

      item.remainingRows -= 1;
    });
    return arr;
  },
  insert: function insert(key, arr) {
    if (this.buffer.has(key)) {
      var _this$buffer$get;

      (_this$buffer$get = this.buffer.get(key)).push.apply(_this$buffer$get, _toConsumableArray(arr));
    } else {
      this.buffer.set(key, arr);
    }
  }
};

function insertDummyCells() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var gridType = arguments.length > 1 ? arguments[1] : undefined;
  dummyBuffer.init();
  return data.map(function (row) {
    var lastRowSpanI = -1;
    var finalCellIndex = 0;
    var cells = row.flatMap(function (col, colIndex) {
      var arr = []; // consume from buffer

      arr.push.apply(arr, _toConsumableArray(dummyBuffer.extract(finalCellIndex, gridType))); // add dummy cell data to buffer for future rows to extract

      if (col.rowSpan > 1) {
        var parentData = {
          remainingRows: col.rowSpan - 1,
          parent: col
        };
        var bufferKey = finalCellIndex;

        if (lastRowSpanI !== -1 && row[colIndex - 1].rowSpan > 1) {
          bufferKey = lastRowSpanI;
        } else {
          lastRowSpanI = finalCellIndex;
        }

        var dummiesToPush = col.colSpan || 1;
        var dummiesArray = [];

        for (var i = 0; i < dummiesToPush; i += 1) {
          dummiesArray.push(_objectSpread({}, parentData));
        }

        dummyBuffer.insert(bufferKey, dummiesArray);
      }

      arr.push(_objectSpread(_objectSpread({}, col), {}, {
        gridType: gridType
      }));

      if (col.colSpan > 1) {
        var totalDummies = col.colSpan - 1;

        var dummies = _toConsumableArray(Array(totalDummies).keys()).map(function (_, index) {
          return generateDummy({
            parent: col,
            index: index,
            totalDummies: totalDummies,
            dummyFor: 'colSpan',
            gridType: gridType
          });
        });

        arr.push.apply(arr, _toConsumableArray(dummies));
      }

      finalCellIndex += arr.length;
      return arr;
    }); // buffer has data for next cell

    cells.push.apply(cells, _toConsumableArray(dummyBuffer.extract(finalCellIndex, gridType)));
    return cells;
  });
}

var defaultCellRenderer = function defaultCellRenderer(_ref2) {
  var key = _ref2.key,
      style = _ref2.style,
      cell = _ref2.cell,
      ref = _ref2.ref;

  var dummy = cell.dummy,
      dummyFor = cell.dummyFor,
      rowSpan = cell.rowSpan,
      colSpan = cell.colSpan,
      first = cell.first,
      last = cell.last,
      gridType = cell.gridType,
      rest = _objectWithoutProperties(cell, ["dummy", "dummyFor", "rowSpan", "colSpan", "first", "last", "gridType"]); // eslint-disable-next-line react/jsx-props-no-spreading


  return /*#__PURE__*/_react["default"].createElement("div", _extends({}, rest, {
    style: style,
    key: key,
    ref: ref
  }));
};

exports.defaultCellRenderer = defaultCellRenderer;