"use strict";

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactVirtualized = require("react-virtualized");

var _lodash = require("lodash");

var _style = require("./style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const recomputeDebounceTimeout = 1000;
const ScrollHandler = /*#__PURE__*/(0, _react.forwardRef)((_ref, componentRef) => {
  let {
    children,
    scrollContainer,
    width,
    totalColumnWidth
  } = _ref;
  const scrollChildRef = (0, _react.useRef)(null);
  const headerRef = (0, _react.useRef)(null);
  const gridRef = (0, _react.useRef)(null);
  const fakeScrollerRef = (0, _react.useRef)(null);
  const [stickyScroller, setStickyScroller] = (0, _react.useState)(true);
  const [scrollLeft, setScrollLeft] = (0, _react.useState)(0);
  const [scrolling, setScrolling] = (0, _react.useState)(false); // exposing api for resetting

  (0, _react.useImperativeHandle)(componentRef, () => ({
    recompute: () => {
      if (headerRef.current) {
        headerRef.current.clearCache();
        headerRef.current.recomputeGridSize();
      }

      if (gridRef.current) {
        gridRef.current.clearCache();
        gridRef.current.recomputeGridSize();
      }

      setScrollLeft(0);
      setScrolling(false);
    }
  })); // updating fake scroller if scrolled on grid body

  (0, _react.useEffect)(() => {
    if (!fakeScrollerRef.current || fakeScrollerRef.current.scrollLeft === scrollLeft) {
      return;
    }

    fakeScrollerRef.current.scrollLeft = scrollLeft;
  }, [scrollLeft]); // update sticky status of fake scroller on each update if not scrolling

  (0, _react.useEffect)(() => {
    if (!scrollChildRef.current || scrolling) {
      return;
    }

    const clientRect = scrollChildRef.current.getBoundingClientRect();
    setStickyScroller(clientRect.bottom > window.innerHeight);
  }); // reset scrolling flag when scroll stops

  const setNotScrolling = (0, _react.useCallback)((0, _lodash.debounce)(() => {
    setScrolling(false);
  }, 100), []);
  const handleScroll = (0, _react.useCallback)((_ref2) => {
    let {
      scrollLeft: paramScrollLeft
    } = _ref2;
    setScrollLeft(paramScrollLeft);
    setScrolling(true);
    setNotScrolling();
  }, []); // call virtualized recompute when window scroller detects resize

  const onResize = (0, _react.useCallback)((0, _lodash.debounce)(() => {
    if (!headerRef.current || !gridRef.current) {
      return;
    }

    headerRef.current.recomputeGridSize();
    gridRef.current.recomputeGridSize();
  }, recomputeDebounceTimeout), []);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactVirtualized.WindowScroller, {
    scrollElement: scrollContainer || window,
    onResize: onResize
  }, (_ref3) => {
    let {
      height,
      isScrolling,
      scrollTop,
      registerChild
    } = _ref3;
    return /*#__PURE__*/_react.default.createElement("div", {
      ref: _ref4 => {
        scrollChildRef.current = _ref4;
        registerChild(_ref4);
      }
    }, children({
      height,
      onScroll: handleScroll,
      isScrolling: isScrolling || scrolling,
      scrollTop,
      scrollLeft,
      headerRef,
      gridRef
    }), totalColumnWidth > width ? /*#__PURE__*/_react.default.createElement(_style.FakeScroller, {
      style: {
        width
      },
      sticky: stickyScroller,
      onScroll: e => handleScroll(e.target),
      ref: fakeScrollerRef
    }, /*#__PURE__*/_react.default.createElement(_style.FakeScrollContent, {
      style: {
        width: totalColumnWidth
      }
    })) : null);
  }), /*#__PURE__*/(0, _reactDom.createPortal)(
  /*#__PURE__*/
  // added to prevent the lag issue between header and body scroll
  _react.default.createElement("canvas", {
    style: {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none'
    }
  }), document.body));
});
ScrollHandler.propTypes = {
  children: _propTypes.default.func.isRequired,
  scrollContainer: _propTypes.default.node,
  width: _propTypes.default.number.isRequired,
  totalColumnWidth: _propTypes.default.number.isRequired
};
ScrollHandler.displayName = 'ScrollHandler';
var _default = ScrollHandler;
exports.default = _default;