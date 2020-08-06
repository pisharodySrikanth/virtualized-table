import styled from 'styled-components';
import GridWrapper from './GridWrapper';

const StyledHeader = styled(GridWrapper)`
  outline: none;
  position: -webkit-sticky !important;
  position: sticky !important;
  top: 0;
  z-index: 1;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledBody = styled(GridWrapper)`
  outline: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const FakeScroller = styled.div`
  position: relative;
  overflow-x: auto;
  min-height: 10px;
  position: ${props => (props.sticky ? 'sticky' : 'relative')};
  bottom: ${props => (props.sticky ? '0px' : 'unset')};
`;

const FakeScrollContent = styled.div`
  height: 10px;
`;

export { StyledHeader, StyledBody, FakeScroller, FakeScrollContent };
