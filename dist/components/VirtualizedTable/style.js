"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FakeScrollContent = exports.FakeScroller = exports.StyledBody = exports.StyledHeader = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _GridWrapper = _interopRequireDefault(require("./GridWrapper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  height: 10px;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  overflow-x: auto;\n  min-height: 10px;\n  z-index: 2;\n  position: ", ";\n  bottom: ", ";\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: -webkit-sticky !important;\n  position: sticky !important;\n  top: 0;\n  z-index: 2;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledHeader = (0, _styledComponents["default"])(_GridWrapper["default"])(_templateObject());
exports.StyledHeader = StyledHeader;
var StyledBody = (0, _styledComponents["default"])(_GridWrapper["default"])(_templateObject2());
exports.StyledBody = StyledBody;

var FakeScroller = _styledComponents["default"].div(_templateObject3(), function (props) {
  return props.sticky ? 'sticky' : 'relative';
}, function (props) {
  return props.sticky ? '0px' : 'unset';
});

exports.FakeScroller = FakeScroller;

var FakeScrollContent = _styledComponents["default"].div(_templateObject4());

exports.FakeScrollContent = FakeScrollContent;