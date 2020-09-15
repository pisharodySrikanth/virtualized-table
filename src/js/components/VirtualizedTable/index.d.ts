import * as React from 'react';

/**
 * A virtualized table built using react-virtualized with additional support for rowspan, colspan and dynamic cell height.
 */
export interface VirtualizedTableProps {
  /**
   * Container ref
   * Exposes two methods:
   * 1. recompute: recomputes all the cell calcuations
   * 2. forceUpdate: This causes the table to be re-rendered. Should do this when you need to re-render even though none of the props are changing. This will cause cellRenderer to be invoked for all the visible cells.
   */
  ref: React.RefObject<HTMLDivElement>;
  /**
   * The minimum height a row of the table should have.
   */
  minRowHeight?: number;
  /**
   * The minimum width a column of the table should have.
   */
  minColumnWidth?: number;
  /**
   * Data to render the body. Expects an array of rows to render. Each row will be an array of columns. Each column will be an object. The data structure to be similar to the way table is rendered in HTML.
   */
  data: any[];
  /**
   * Data to render the header. Expects an array of rows to render. Each row will be an array of columns. Each column will be an object. The data structure to be similar to the way table is rendered in HTML.
   */
  headerData?: any[];
  /**
   * The number of starting columns which will be fixed. Defaults to 0.
   */
  fixedColumnCount?: number;
  /**
   * Will get single cell data as input and must return the corresponding for the cell
   */
  cellRenderer: (params: {
    rowIndex?: number,
    columnIndex?: number,
    key?: string,
    parent?: React.FC,
    style: Object,
    ref: React.RefObject<HTMLDivElement>,
    cell: Object,
  }) => JSX.Element;
  /**
   * The table container on which overflow auto is applied. The header will stick with respect to this node.
   */
  scrollContainer: {
    current: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  };
  /**
   * Optimization function passed to the react-virtualized CellCache. Helps the cache to skip calculating the height of cells.
   */
  cacheKeyMapper?: (key: string) => string;
  /**
   * Gets the params of the react-virtualized cellRangeRenderer and the defaultCellRangeRenderer. Used for optimization purposes.
   */
  cellRangeRenderer?: (args: Object, defaultCellRangeRenderer: (args: Object) => React.ReactNode) => React.ReactNode;
}

declare const VirtualizedTable: React.FC<VirtualizedTableProps>;

export { VirtualizedTable };
