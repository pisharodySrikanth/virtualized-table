import React, { forwardRef } from 'react';

import { AutoSizer, ColumnSizer } from 'react-virtualized';
import ScrollHandler from './ScrollHandler';
import { StyledHeader, StyledBody } from './style';

const VirtualizedTable = forwardRef((props, componentRef) => {
  const columnCount = props.data.length ? props.data[0].length : 0;

  return (
    <AutoSizer disableHeight>
      {({ width }) => (
        <ColumnSizer
          columnMinWidth={props.minColumnWidth}
          columnCount={columnCount}
          width={width}
        >
          {({ adjustedWidth, columnWidth, registerChild }) => (
            <ScrollHandler
              scrollContainer={props.scrollContainer.current}
              width={width}
              data={props.data}
              totalColumnWidth={columnWidth * columnCount}
              ref={componentRef}
            >
              {({
                scrollTop,
                scrollLeft,
                isScrolling,
                gridRef,
                headerRef,
                onScroll,
                height,
              }) => (
                <>
                  <StyledHeader
                    className="virtualized-table-header"
                    data={props.headerData}
                    cellRenderer={props.cellRenderer}
                    autoHeight
                    width={adjustedWidth}
                    columnWidth={columnWidth}
                    type="header"
                    ref={headerRef}
                    minRowHeight={props.minRowHeight}
                    scrollLeft={scrollLeft}
                    isScrolling={isScrolling}
                    onScroll={onScroll}
                    height={height}
                    fixedColumnCount={props.fixedColumnCount}
                  />
                  <StyledBody
                    className="virtualized-table-body"
                    data={props.data}
                    cellRenderer={props.cellRenderer}
                    autoHeight
                    scrollTop={scrollTop}
                    registerGrid={registerChild}
                    columnWidth={columnWidth}
                    width={adjustedWidth}
                    type="body"
                    minRowHeight={props.minRowHeight}
                    ref={gridRef}
                    scrollLeft={scrollLeft}
                    isScrolling={isScrolling}
                    onScroll={onScroll}
                    height={height}
                    fixedColumnCount={props.fixedColumnCount}
                    cacheKeyMapper={props.cacheKeyMapper}
                    cellRangeRenderer={props.cellRangeRenderer}
                  />
                </>
              )}
            </ScrollHandler>
          )}
        </ColumnSizer>
      )}
    </AutoSizer>
  );
});

VirtualizedTable.displayName = 'VirtualizedTable';

VirtualizedTable.defaultProps = {
  minRowHeight: 50,
  minColumnWidth: 120,
  headerData: [],
  fixedColumnCount: 0,
};

let VirtualizedTableDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  VirtualizedTableDoc = require('./doc').doc(VirtualizedTable);
}
const VirtualizedTableWrapper = VirtualizedTableDoc || VirtualizedTable;

export { VirtualizedTableWrapper as VirtualizedTable };
