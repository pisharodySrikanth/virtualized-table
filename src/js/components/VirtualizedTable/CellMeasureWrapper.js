import React from 'react';
import PropTypes from 'prop-types';
import { CellMeasurer, CellMeasurerCache } from 'react-virtualized';

const generateArr = n => [...Array(n).keys()];

const getMaxSum = (generator, x) =>
  generateArr(x).reduce((sum, i) => sum + generator(i), 0);

const CellMeasureWrapper = ({
  rowSpan,
  colSpan,
  children,
  cellRenderer,
  rendererProps,
  ...props
}) => {
  const initializeStyle = () => {
    if (rowSpan === 1 && colSpan === 1) {
      return {};
    }

    const {
      parent: {
        props: { columnWidth },
      },
      rowIndex,
      cache,
    } = props;
    const rowGenerator = row => cache.rowHeight({ index: rowIndex + row });

    const rowSpanStyle =
      rowSpan === 1
        ? {}
        : {
            height: getMaxSum(rowGenerator, rowSpan),
          };
    const colSpanStyle =
      colSpan === 1
        ? {}
        : {
            width: columnWidth * colSpan,
          };

    return {
      ...rowSpanStyle,
      ...colSpanStyle,
      zIndex: 1,
    };
  };

  const style = initializeStyle();

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <CellMeasurer {...props}>
      {({ registerChild }) =>
        cellRenderer({
          ...rendererProps,
          style: {
            ...rendererProps.style,
            ...style,
          },
          ref: registerChild,
        })
      }
    </CellMeasurer>
  );
};

CellMeasureWrapper.propTypes = {
  rowSpan: PropTypes.number,
  colSpan: PropTypes.number,
  parent: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  columnIndex: PropTypes.number.isRequired,
  cache: PropTypes.instanceOf(CellMeasurerCache).isRequired,
  children: PropTypes.node.isRequired,
  cellRenderer: PropTypes.func.isRequired,
  rendererProps: PropTypes.object.isRequired,
};

CellMeasureWrapper.defaultProps = {
  rowSpan: 1,
  colSpan: 1,
};

export default CellMeasureWrapper;
