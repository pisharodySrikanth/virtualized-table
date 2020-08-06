import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup /* , fireEvent, render */ } from '@testing-library/react';
import 'jest-styled-components';
import { MnetUIBase } from 'mnet-ui-base';
import VirtualizedTable from '..';

describe('VirtualizedTable', () => {
  afterEach(cleanup);
  test('basic', () => {
    const component = renderer.create(
      <MnetUIBase>
        <VirtualizedTable />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
