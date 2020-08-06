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
import { FixedColContainer, GridComponent } from './gridStyles';

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
  const fixedGridRef = useRef(null);
  const gridRef = useRef(null);

  const data = useMemo(() => insertDummyCells(props.data, props.type), [
    props.data,
  ]);

  useImperativeHandle(componentRef, () => ({
    recomputeGridSize: () => {
      if (gridRef.current) {
        gridRef.current.recomputeGridSize();
      }
      if (fixedGridRef.current) {
        fixedGridRef.current.recomputeGridSize();
      }
    },
    forceUpdate: () => {
      if (gridRef.current) {
        gridRef.current.forceUpdate();
      }
      if (fixedGridRef.current) {
        fixedGridRef.current.forceUpdate();
      }
    },
  }));

  // clear cache and recompute when data changes
  useEffect(() => {
    cache.clearAll();
    if (gridRef.current) {
      gridRef.current.recomputeGridSize();
    }
    if (fixedGridRef.current) {
      fixedGridRef.current.recomputeGridSize();
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

  const bodyCellRenderer = useCallback(
    args =>
      args.columnIndex >= props.fixedColumnCount ? cellRenderer(args) : null,
    [props.fixedColumnCount, cellRenderer],
  );

  const columnCount = data.length ? data[0].length : 0;
  const gridProps = {
    deferredMeasurementCache: cache,
    rowHeight: cache.rowHeight,
    rowCount: data.length,
    overscanRowCount: 2,
    overscanColumnCount: 2,
    columnWidth: props.columnWidth,
    minRowHeight: props.minRowHeight,
    height: props.height,
    scrollTop: props.scrollTop,
    // these props are passed so that the grid rerenders when they change
    data: props.data,
    fixedColumnCount: props.fixedColumnCount,
  };

  return (
    <div
      className={props.className}
      style={{
        width: props.width,
      }}
    >
      {props.fixedColumnCount > 0 ? (
        <FixedColContainer>
          <Grid
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...gridProps}
            ref={fixedGridRef}
            autoHeight
            width={props.fixedColumnCount * props.columnWidth}
            columnCount={props.fixedColumnCount}
            cellRenderer={cellRenderer}
          />
        </FixedColContainer>
      ) : null}
      <GridComponent
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...gridProps}
        ref={instance => {
          if (props.registerGrid) {
            props.registerGrid(instance);
          }
          gridRef.current = instance;
        }}
        cellRenderer={bodyCellRenderer}
        columnCount={columnCount}
        overscanRowCount={2}
        overscanColumnCount={2}
        autoHeight
        width={props.width}
        scrollLeft={props.scrollLeft}
        isScrolling={props.isScrolling}
        onScroll={props.onScroll}
      />
    </div>
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
  fixedColumnCount: PropTypes.number,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  scrollLeft: PropTypes.number.isRequired,
  scrollTop: PropTypes.number.isRequired,
  isScrolling: PropTypes.bool.isRequired,
  onScroll: PropTypes.func,
};

GridWrapper.defaultProps = {
  type: 'body',
  cellRenderer: defaultCellRenderer,
};

export default GridWrapper;
