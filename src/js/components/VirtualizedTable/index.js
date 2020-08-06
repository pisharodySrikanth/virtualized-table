import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

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

VirtualizedTable.propTypes = {
  cellRenderer: PropTypes.func.isRequired,
  headerData: PropTypes.array,
  data: PropTypes.array.isRequired,
  scrollContainer: PropTypes.object.isRequired,
  minRowHeight: PropTypes.number,
  minColumnWidth: PropTypes.number,
};

VirtualizedTable.defaultProps = {
  minRowHeight: 50,
  minColumnWidth: 120,
  headerData: [],
};

let VirtualizedTableDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  VirtualizedTableDoc = require('./doc').doc(VirtualizedTable);
}
const VirtualizedTableWrapper = VirtualizedTableDoc || VirtualizedTable;

export { VirtualizedTableWrapper as VirtualizedTable };
