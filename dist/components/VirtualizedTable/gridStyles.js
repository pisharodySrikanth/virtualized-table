"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridComponent = exports.FixedColContainer = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactVirtualized = require("react-virtualized");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  outline: none;\n  scrollbar-width: none;\n  &::-webkit-scrollbar {\n    display: none;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  left: 0;\n  top: 0;\n  z-index: 1;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var FixedColContainer = _styledComponents["default"].div(_templateObject());

exports.FixedColContainer = FixedColContainer;
var GridComponent = (0, _styledComponents["default"])(_reactVirtualized.Grid)(_templateObject2());
exports.GridComponent = GridComponent;