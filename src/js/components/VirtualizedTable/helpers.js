/* eslint-disable react/prop-types */
import React from 'react';

const generateDummy = ({ parent, index, totalDummies, dummyFor, gridType }) => {
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

  return {
    ...parent,
    colSpan: 1,
    rowSpan: 1,
    children: '',
    dummy: true,
    dummyFor,
    first,
    last,
    gridType,
    style: {
      ...parent.style,
      ...style,
    },
  };
};

const dummyBuffer = {
  init() {
    this.buffer = new Map();
  },
  extract(index, gridType) {
    const { buffer } = this;
    const arr = [];

    if (!buffer.has(index) || buffer.get(index).length === 0) {
      return arr;
    }

    buffer.get(index).forEach(item => {
      if (!item.remainingRows) {
        return;
      }

      arr.push(
        generateDummy({
          parent: item.parent,
          totalDummies: item.parent.rowSpan - 1,
          index: item.parent.rowSpan - 1 - item.remainingRows,
          dummyFor: 'rowSpan',
          gridType,
        }),
      );

      // eslint-disable-next-line no-param-reassign
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
  },
};

export function insertDummyCells(data = [], gridType) {
  dummyBuffer.init();

  return data.map(row => {
    let lastRowSpanI = -1;
    let finalCellIndex = 0;

    const cells = row.flatMap((col, colIndex) => {
      const arr = [];

      // consume from buffer
      arr.push(...dummyBuffer.extract(finalCellIndex, gridType));

      // add dummy cell data to buffer for future rows to extract
      if (col.rowSpan > 1) {
        const parentData = {
          remainingRows: col.rowSpan - 1,
          parent: col,
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
          dummiesArray.push({ ...parentData });
        }

        dummyBuffer.insert(bufferKey, dummiesArray);
      }

      arr.push({
        ...col,
        gridType,
      });

      if (col.colSpan > 1) {
        const totalDummies = col.colSpan - 1;
        const dummies = [...Array(totalDummies).keys()].map((_, index) =>
          generateDummy({
            parent: col,
            index,
            totalDummies,
            dummyFor: 'colSpan',
            gridType,
          }),
        );

        arr.push(...dummies);
      }

      finalCellIndex += arr.length;

      return arr;
    });

    // buffer has data for next cell
    cells.push(...dummyBuffer.extract(finalCellIndex, gridType));

    return cells;
  });
}

export const defaultCellRenderer = ({ key, style, cell, ref }) => {
  const {
    dummy,
    dummyFor,
    rowSpan,
    colSpan,
    first,
    last,
    gridType,
    ...rest
  } = cell;

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <div {...rest} style={style} key={key} ref={ref} />;
};

export const defaultRangeRenderer = (args, renderer) => renderer(args);
