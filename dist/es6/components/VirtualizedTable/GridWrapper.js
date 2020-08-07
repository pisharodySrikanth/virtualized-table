'use strict';

function _typeof(obj) {
  '@babel/helpers - typeof';
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj;
    };
  }
  return _typeof(obj);
}

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _react = _interopRequireWildcard(require('react'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _reactVirtualized = require('react-virtualized');

var _CellMeasureWrapper = _interopRequireDefault(
  require('./CellMeasureWrapper'),
);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _getRequireWildcardCache() {
  if (typeof WeakMap !== 'function') return null;
  var cache = new WeakMap();
  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };
  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  if (
    obj === null ||
    (_typeof(obj) !== 'object' && typeof obj !== 'function')
  ) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache();
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj['default'] = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

function _extends() {
  _extends =
    Object.assign ||
    function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key),
        );
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var useLazyRef = function useLazyRef(func) {
  var ref = (0, _react.useRef)(null);

  if (!ref.current) {
    ref.current = func();
  }

  return ref;
};

var GridWrapper = /*#__PURE__*/ (0, _react.forwardRef)(function(
  props,
  componentRef,
) {
  var _useLazyRef = useLazyRef(function() {
      return new _reactVirtualized.CellMeasurerCache({
        defaultWidth: props.columnWidth,
        defaultHeight: props.minRowHeight,
        fixedWidth: true,
        minHeight: props.minRowHeight,
        minWidth: props.columnWidth,
      });
    }),
    cache = _useLazyRef.current;

  var gridRef = (0, _react.useRef)(null);
  var data = (0, _react.useMemo)(
    function() {
      return (0, _helpers.insertDummyCells)(props.data, props.type);
    },
    [props.data],
  );
  (0, _react.useImperativeHandle)(componentRef, function() {
    return {
      recomputeGridSize: function recomputeGridSize() {
        if (gridRef.current) {
          gridRef.current.recomputeGridSize();
        }
      },
    };
  }); // clear cache and recompute when data changes

  (0, _react.useEffect)(
    function() {
      cache.clearAll();

      if (gridRef.current) {
        gridRef.current.recomputeGridSize();
      }
    },
    [data],
  );
  var cellRenderer = (0, _react.useCallback)(
    function(args) {
      var cell = data[args.rowIndex][args.columnIndex];
      return cell
        ? /*#__PURE__*/ _react['default'].createElement(
            _CellMeasureWrapper['default'],
            {
              cache: cache,
              columnIndex: args.columnIndex,
              key: args.key,
              parent: args.parent,
              rowIndex: args.rowIndex,
              rowSpan: cell.rowSpan,
              colSpan: cell.colSpan,
              cellRenderer: props.cellRenderer,
              rendererProps: _objectSpread(
                _objectSpread({}, args),
                {},
                {
                  style: _objectSpread(
                    _objectSpread(_objectSpread({}, args.style), cell.style),
                    {},
                    {
                      width: args.parent.props.columnWidth,
                    },
                  ),
                  cell: cell,
                },
              ),
            },
          )
        : null;
    },
    [data],
  );
  var columnCount = data.length ? data[0].length : 0;
  return /*#__PURE__*/ _react['default'].createElement(
    _reactVirtualized.Grid, // eslint-disable-next-line react/jsx-props-no-spreading
    _extends({}, props, {
      ref: function ref(instance) {
        if (props.registerGrid) {
          props.registerGrid(instance);
        }

        gridRef.current = instance;
      },
      cellRenderer: cellRenderer,
      deferredMeasurementCache: cache,
      rowHeight: cache.rowHeight,
      rowCount: data.length,
      columnCount: columnCount,
      overscanRowCount: 2,
      overscanColumnCount: 2,
    }),
  );
});
GridWrapper.propTypes = {
  className: _propTypes['default'].string.isRequired,
  cellRenderer: _propTypes['default'].func,
  minRowHeight: _propTypes['default'].number.isRequired,
  columnWidth: _propTypes['default'].number.isRequired,
  data: _propTypes['default'].array.isRequired,
  registerGrid: _propTypes['default'].func,
  type: _propTypes['default'].string,
};
GridWrapper.defaultProps = {
  type: 'body',
  cellRenderer: _helpers.defaultCellRenderer,
};
var _default = GridWrapper;
exports['default'] = _default;
