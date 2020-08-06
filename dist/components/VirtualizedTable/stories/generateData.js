"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSimpleData = void 0;

var getSimpleData = function getSimpleData(rows, columns) {
  var headerData = [];
  var data = [];
  var headerRows = 2;

  for (var i = 0; i < headerRows; i += 1) {
    var row = [];

    for (var j = 0; j < columns; j += 1) {
      if (i === 0) {
        if (j % 2 === 0) {
          row.push({
            children: "Colspanned Column [".concat(i + 1, ", ").concat(j + 1, "]"),
            colSpan: 2
          });
        }
      } else {
        row.push({
          children: "Column [".concat(i + 1, ", ").concat(j + 1, "]")
        });
      }
    }

    headerData.push(row);
  }

  for (var _i = 0; _i < columns; _i += 1) {
    headerData[0].push({
      children: "Column ".concat(_i + 1)
    });
  }

  for (var _i2 = 0; _i2 < rows; _i2 += 1) {
    var _row = [];

    for (var _j = 0; _j < columns; _j += 1) {
      if (_j === 0) {
        if (_i2 % 3 === 0) {
          _row.push({
            children: "Rowspanned Cell [".concat(_i2 + 1, ", ").concat(_j + 1, "]"),
            rowSpan: 3
          });
        }
      } else {
        _row.push({
          children: "Cell [".concat(_i2 + 1, ", ").concat(_j + 1, "]")
        });
      }
    }

    data.push(_row);
  }

  return {
    headerData: headerData,
    data: data
  };
};

exports.getSimpleData = getSimpleData;