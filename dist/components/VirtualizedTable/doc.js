"use strict";

require("core-js/modules/es.symbol.description");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.doc = void 0;

var _reactDesc = require("react-desc");

const doc = VirtualizedTable => {
  const DocumentedVirtualizedTable = (0, _reactDesc.describe)(VirtualizedTable).description('A VirtualizedTable.').details("You can provide a single function child that will be called with\n        'hover' and 'focus' keys. This allows you to customize the rendering\n        of the Button in those cases.").usage("import { VirtualizedTable } from 'mnet-lib';\n        <VirtualizedTable />").intrinsicElement('div');
  DocumentedVirtualizedTable.propTypes = {};
  return DocumentedVirtualizedTable;
};

exports.doc = doc;