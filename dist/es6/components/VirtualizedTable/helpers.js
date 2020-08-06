"use strict";

require("core-js/modules/es.array.flat-map");

require("core-js/modules/es.array.unscopables.flat-map");

require("core-js/modules/es.object.assign");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertDummyCells = insertDummyCells;
exports.defaultCellRenderer = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const generateDummy = (_ref) => {
  let {
    parent,
    index,
    totalDummies,
    dummyFor,
    gridType
  } = _ref;
  const style = {};
  const first = index === 0;
  const last = index === totalDummies - 1;

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
    dummyFor,
    first,
    last,
    gridType,
    style: _objectSpread(_objectSpread({}, parent.style), style)
  });
};

const dummyBuffer = {
  init() {
    this.buffer = new Map();
  },

  extract(index, gridType) {
    const {
      buffer
    } = this;
    const arr = [];

    if (!buffer.has(index) || buffer.get(index).length === 0) {
      return arr;
    }

    buffer.get(index).forEach(item => {
      if (!item.remainingRows) {
        return;
      }

      arr.push(generateDummy({
        parent: item.parent,
        totalDummies: item.parent.rowSpan - 1,
        index: item.parent.rowSpan - 1 - item.remainingRows,
        dummyFor: 'rowSpan',
        gridType
      })); // eslint-disable-next-line no-param-reassign

      item.remainingRows -= 1;
    });
    return arr;
  },

  insert(key, arr) {
    if (this.buffer.has(key)) {
      this.buffer.get(key).push(...arr);
    } else {
      this.buffer.set(key, arr);
    }
  }

};

function insertDummyCells() {
  let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  let gridType = arguments.length > 1 ? arguments[1] : undefined;
  dummyBuffer.init();
  return data.map(row => {
    let lastRowSpanI = -1;
    let finalCellIndex = 0;
    const cells = row.flatMap((col, colIndex) => {
      const arr = []; // consume from buffer

      arr.push(...dummyBuffer.extract(finalCellIndex, gridType)); // add dummy cell data to buffer for future rows to extract

      if (col.rowSpan > 1) {
        const parentData = {
          remainingRows: col.rowSpan - 1,
          parent: col
        };
        let bufferKey = finalCellIndex;

        if (lastRowSpanI !== -1 && row[colIndex - 1].rowSpan > 1) {
          bufferKey = lastRowSpanI;
        } else {
          lastRowSpanI = finalCellIndex;
        }

        const dummiesToPush = col.colSpan || 1;
        const dummiesArray = [];

        for (let i = 0; i < dummiesToPush; i += 1) {
          dummiesArray.push(_objectSpread({}, parentData));
        }

        dummyBuffer.insert(bufferKey, dummiesArray);
      }

      arr.push(_objectSpread(_objectSpread({}, col), {}, {
        gridType
      }));

      if (col.colSpan > 1) {
        const totalDummies = col.colSpan - 1;
        const dummies = [...Array(totalDummies).keys()].map((_, index) => generateDummy({
          parent: col,
          index,
          totalDummies,
          dummyFor: 'colSpan',
          gridType
        }));
        arr.push(...dummies);
      }

      finalCellIndex += arr.length;
      return arr;
    }); // buffer has data for next cell

    cells.push(...dummyBuffer.extract(finalCellIndex, gridType));
    return cells;
  });
}

const defaultCellRenderer = (_ref2) => {
  let {
    key,
    style,
    cell,
    ref
  } = _ref2;

  const {
    dummy,
    dummyFor,
    rowSpan,
    colSpan,
    first,
    last,
    gridType
  } = cell,
        rest = _objectWithoutProperties(cell, ["dummy", "dummyFor", "rowSpan", "colSpan", "first", "last", "gridType"]); // eslint-disable-next-line react/jsx-props-no-spreading


  return /*#__PURE__*/_react.default.createElement("div", _extends({}, rest, {
    style: style,
    key: key,
    ref: ref
  }));
};

exports.defaultCellRenderer = defaultCellRenderer;