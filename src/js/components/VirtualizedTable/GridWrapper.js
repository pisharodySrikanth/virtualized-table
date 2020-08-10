import React, {
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
import PropTypes from 'prop-types';
import { Grid, CellMeasurerCache } from 'react-virtualized';
import CellMeasurer from './CellMeasureWrapper';
import { insertDummyCells, defaultCellRenderer } from './helpers';

const useLazyRef = func => {
  const ref = useRef(null);

  if (!ref.current) {
    ref.current = func();
  }

  return ref;
};

const GridWrapper = forwardRef((props, componentRef) => {
  const { current: cache } = useLazyRef(
    () =>
      new CellMeasurerCache({
        defaultWidth: props.columnWidth,
        defaultHeight: props.minRowHeight,
        fixedWidth: true,
        minHeight: props.minRowHeight,
        minWidth: props.columnWidth,
      }),
  );
  const gridRef = useRef(null);

  const data = useMemo(() => insertDummyCells(props.data, props.type), [
    props.data,
  ]);

  useImperativeHandle(componentRef, () => ({
    recomputeGridSize: () => {
      if (gridRef.current) {
        gridRef.current.recomputeGridSize();
      }
    },
  }));

  // clear cache and recompute when data changes
  useEffect(() => {
    cache.clearAll();
    if (gridRef.current) {
      gridRef.current.recomputeGridSize();
    }
  }, [data]);

  const cellRenderer = useCallback(
    args => {
      const cell = data[args.rowIndex][args.columnIndex];

      return cell ? (
        <CellMeasurer
          cache={cache}
          columnIndex={args.columnIndex}
          key={args.key}
          parent={args.parent}
          rowIndex={args.rowIndex}
          rowSpan={cell.rowSpan}
          colSpan={cell.colSpan}
          cellRenderer={props.cellRenderer}
          rendererProps={{
            ...args,
            style: {
              ...args.style,
              ...cell.style,
              transform: 'translate3d(0, 0, 0)',
              width: args.parent.props.columnWidth,
            },
            cell,
          }}
        />
      ) : null;
    },
    [data],
  );

  const columnCount = data.length ? data[0].length : 0;

  return (
    <Grid
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      ref={instance => {
        if (props.registerGrid) {
          props.registerGrid(instance);
        }
        gridRef.current = instance;
      }}
      cellRenderer={cellRenderer}
      deferredMeasurementCache={cache}
      rowHeight={cache.rowHeight}
      rowCount={data.length}
      columnCount={columnCount}
      overscanRowCount={2}
      overscanColumnCount={2}
    />
  );
});

GridWrapper.propTypes = {
  className: PropTypes.string.isRequired,
  cellRenderer: PropTypes.func,
  minRowHeight: PropTypes.number.isRequired,
  columnWidth: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  registerGrid: PropTypes.func,
  type: PropTypes.string,
};

GridWrapper.defaultProps = {
  type: 'body',
  cellRenderer: defaultCellRenderer,
};

export default GridWrapper;
