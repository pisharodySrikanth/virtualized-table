"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSimpleData = void 0;

const getSimpleData = (rows, columns) => {
  const headerData = [];
  const data = [];
  const headerRows = 2;

  for (let i = 0; i < headerRows; i += 1) {
    const row = [];

    for (let j = 0; j < columns; j += 1) {
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

  for (let i = 0; i < columns; i += 1) {
    headerData[0].push({
      children: "Column ".concat(i + 1)
    });
  }

  for (let i = 0; i < rows; i += 1) {
    const row = [];

    for (let j = 0; j < columns; j += 1) {
      if (j === 0) {
        if (i % 3 === 0) {
          row.push({
            children: "Rowspanned Cell [".concat(i + 1, ", ").concat(j + 1, "]"),
            rowSpan: 3
          });
        }
      } else {
        row.push({
          children: "Cell [".concat(i + 1, ", ").concat(j + 1, "]")
        });
      }
    }

    data.push(row);
  }

  return {
    headerData,
    data
  };
};

exports.getSimpleData = getSimpleData;