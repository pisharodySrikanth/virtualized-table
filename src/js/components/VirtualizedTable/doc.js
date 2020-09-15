import { describe, PropTypes } from 'react-desc';

export const doc = VirtualizedTable => {
  const DocumentedVirtualizedTable = describe(VirtualizedTable)
    .description('A VirtualizedTable.')
    .details(
      `A virtualized table built using react-virtualized with additional support for rowspan, colspan and dynamic cell height.`,
    )
    .usage(
      `import VirtualizedTable from 'virtualized-table';
        <VirtualizedTable />`,
    )
    .intrinsicElement('div');

  DocumentedVirtualizedTable.propTypes = {
    cellRenderer: PropTypes.func.description(
      'Will get single cell data as input and must return the corresponding for the cell',
    ).isRequired,
    headerData: PropTypes.array
      .description(
        'Data to render the header. Expects an array of rows to render. Each row will be an array of columns. Each column will be an object. The data structure to be similar to the way table is rendered in HTML',
      )
      .defaultValue([]),
    data: PropTypes.array.isRequired.description(
      'Data to render the body. Expects an array of rows to render. Each row will be an array of columns. Each column will be an object. The data structure to be similar to the way table is rendered in HTML',
    ),
    scrollContainer: PropTypes.shape({
      current: PropTypes.node,
    }).description(
      'The table container on which overflow auto is applied. The header will stick with respect to this node',
    ).isRequired,
    minRowHeight: PropTypes.number
      .description('The minimum height a row of the table should have.')
      .defaultValue(50),
    minColumnWidth: PropTypes.number
      .description('The minimum width a column of the table should have.')
      .defaultValue(120),
    fixedColumnCount: PropTypes.number
      .description('The number of starting columns which will be fixed.')
      .defaultValue(0),
    cacheKeyMapper: PropTypes.func.description(
      'Optimization function passed to the react-virtualized CellCache. Helps the cache to skip calculating the height of cells.',
    ),
    cellRangeRenderer: PropTypes.func.description(
      'Gets the params of the react-virtualized cellRangeRenderer and the defaultCellRangeRenderer. Used for optimization purposes.',
    ),
  };

  return DocumentedVirtualizedTable;
};
