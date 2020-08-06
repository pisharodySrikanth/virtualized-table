import React, { useRef } from 'react';
import { storiesOf } from '@storybook/react';

import { MnetUIBase } from 'mnet-ui-base';
import { VirtualizedTable } from '..';
import { getSimpleData } from './generateData';

const { headerData, data } = getSimpleData(500, 15);

const BasicVirtualizedTable = (/* props */) => {
  const divRef = useRef(null);

  const cellRenderer = ({ style, cell, ref }) => {
    const { gridType, children } = cell;

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '5px',
          boxSizing: 'border-box',
          ...(gridType === 'header'
            ? {
                background: '#efefef',
                border: '1px solid #ccc',
              }
            : {
                border: '1px solid #ccc',
              }),
          ...style,
        }}
        ref={ref}
      >
        {children}
      </div>
    );
  };

  return (
    <MnetUIBase>
      <div
        style={{
          height: '100%',
          overflow: 'auto',
          margin: 15,
          maxHeight: 500,
        }}
        ref={divRef}
      >
        <VirtualizedTable
          headerData={headerData}
          data={data}
          cellRenderer={cellRenderer}
          scrollContainer={divRef}
          fixedColumnCount={2}
        />
      </div>
    </MnetUIBase>
  );
};

storiesOf('VirtualizedTable', module).add('Basic', () => (
  <BasicVirtualizedTable />
));
