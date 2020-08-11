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

var _reactDom = require('react-dom');

var _propTypes = _interopRequireDefault(require('prop-types'));

var _reactVirtualized = require('react-virtualized');

var _lodash = require('lodash');

var _style = require('./style');

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

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === 'undefined' || !(Symbol.iterator in Object(arr)))
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

var recomputeDebounceTimeout = 1000;
var ScrollHandler = /*#__PURE__*/ (0, _react.forwardRef)(function(
  _ref,
  componentRef,
) {
  var children = _ref.children,
    scrollContainer = _ref.scrollContainer,
    width = _ref.width,
    totalColumnWidth = _ref.totalColumnWidth;
  var scrollChildRef = (0, _react.useRef)(null);
  var headerRef = (0, _react.useRef)(null);
  var gridRef = (0, _react.useRef)(null);
  var fakeScrollerRef = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(true),
    _useState2 = _slicedToArray(_useState, 2),
    stickyScroller = _useState2[0],
    setStickyScroller = _useState2[1];

  var _useState3 = (0, _react.useState)(0),
    _useState4 = _slicedToArray(_useState3, 2),
    scrollLeft = _useState4[0],
    setScrollLeft = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    scrolling = _useState6[0],
    setScrolling = _useState6[1]; // exposing api for resetting

  (0, _react.useImperativeHandle)(componentRef, function() {
    return {
      recompute: function recompute() {
        setScrollLeft(0);
        setScrolling(false);
      },
      forceUpdate: function forceUpdate() {
        if (!headerRef.current || !gridRef.current) {
          return;
        }

        headerRef.current.forceUpdate();
        gridRef.current.forceUpdate();
      },
    };
  }); // updating fake scroller if scrolled on grid body

  (0, _react.useEffect)(
    function() {
      if (
        !fakeScrollerRef.current ||
        fakeScrollerRef.current.scrollLeft === scrollLeft
      ) {
        return;
      }

      fakeScrollerRef.current.scrollLeft = scrollLeft;
    },
    [scrollLeft],
  ); // update sticky status of fake scroller on each update if not scrolling

  (0, _react.useEffect)(function() {
    if (!scrollChildRef.current || scrolling) {
      return;
    }

    var clientRect = scrollChildRef.current.getBoundingClientRect();
    setStickyScroller(clientRect.bottom > window.innerHeight);
  }); // reset scrolling flag when scroll stops

  var setNotScrolling = (0, _react.useCallback)(
    (0, _lodash.debounce)(function() {
      setScrolling(false);
    }, 100),
    [],
  );
  var handleScroll = (0, _react.useCallback)(function(_ref2) {
    var paramScrollLeft = _ref2.scrollLeft;
    setScrollLeft(paramScrollLeft);
    setScrolling(true);
    setNotScrolling();
  }, []); // call virtualized recompute when window scroller detects resize

  var onResize = (0, _react.useCallback)(
    (0, _lodash.debounce)(function() {
      if (!headerRef.current || !gridRef.current) {
        return;
      }

      headerRef.current.recomputeGridSize();
      gridRef.current.recomputeGridSize();
    }, recomputeDebounceTimeout),
    [],
  );
  return /*#__PURE__*/ _react['default'].createElement(
    _react['default'].Fragment,
    null,
    /*#__PURE__*/ _react['default'].createElement(
      _reactVirtualized.WindowScroller,
      {
        scrollElement: scrollContainer || window,
        onResize: onResize,
      },
      function(_ref3) {
        var height = _ref3.height,
          isScrolling = _ref3.isScrolling,
          scrollTop = _ref3.scrollTop,
          registerChild = _ref3.registerChild;
        return /*#__PURE__*/ _react['default'].createElement(
          'div',
          {
            ref: function ref(_ref4) {
              scrollChildRef.current = _ref4;
              registerChild(_ref4);
            },
          },
          children({
            height: height,
            onScroll: handleScroll,
            isScrolling: isScrolling || scrolling,
            scrollTop: scrollTop,
            scrollLeft: scrollLeft,
            headerRef: headerRef,
            gridRef: gridRef,
          }),
          totalColumnWidth > width
            ? /*#__PURE__*/ _react['default'].createElement(
                _style.FakeScroller,
                {
                  style: {
                    width: width,
                  },
                  sticky: stickyScroller,
                  onScroll: function onScroll(e) {
                    return handleScroll(e.target);
                  },
                  ref: fakeScrollerRef,
                },
                /*#__PURE__*/ _react['default'].createElement(
                  _style.FakeScrollContent,
                  {
                    style: {
                      width: totalColumnWidth,
                    },
                  },
                ),
              )
            : null,
        );
      },
    ),
    /*#__PURE__*/ (0, _reactDom.createPortal)(
      /*#__PURE__*/
      // added to prevent the lag issue between header and body scroll
      _react['default'].createElement('canvas', {
        style: {
          position: 'absolute',
          top: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        },
      }),
      document.body,
    ),
  );
});
ScrollHandler.propTypes = {
  children: _propTypes['default'].func.isRequired,
  scrollContainer: _propTypes['default'].node,
  width: _propTypes['default'].number.isRequired,
  totalColumnWidth: _propTypes['default'].number.isRequired,
};
ScrollHandler.displayName = 'ScrollHandler';
var _default = ScrollHandler;
exports['default'] = _default;
