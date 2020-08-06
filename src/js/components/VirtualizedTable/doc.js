import { describe /* , PropTypes */ } from 'react-desc';

export const doc = VirtualizedTable => {
  const DocumentedVirtualizedTable = describe(VirtualizedTable)
    .description('A VirtualizedTable.')
    .details(
      `You can provide a single function child that will be called with
        'hover' and 'focus' keys. This allows you to customize the rendering
        of the Button in those cases.`,
    )
    .usage(
      `import { VirtualizedTable } from 'mnet-lib';
        <VirtualizedTable />`,
    )
    .intrinsicElement('div');

  DocumentedVirtualizedTable.propTypes = {};

  return DocumentedVirtualizedTable;
};
