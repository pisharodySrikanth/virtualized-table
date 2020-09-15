import styled from 'styled-components';
import { Grid } from 'react-virtualized';

export const FixedColContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
`;

export const FixedGrid = styled(Grid)`
  outline: none;
`;

export const GridComponent = styled(Grid)`
  outline: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
