import styled from 'styled-components';
import GridWrapper from './GridWrapper';

const StyledHeader = styled(GridWrapper)`
  position: -webkit-sticky !important;
  position: sticky !important;
  top: 0;
  z-index: 2;
`;

const StyledBody = styled(GridWrapper)`
  position: relative;
`;

const FakeScroller = styled.div`
  position: relative;
  overflow-x: auto;
  min-height: 10px;
  z-index: 2;
  position: ${props => (props.sticky ? 'sticky' : 'relative')};
  bottom: ${props => (props.sticky ? '0px' : 'unset')};
`;

const FakeScrollContent = styled.div`
  height: 10px;
`;

export { StyledHeader, StyledBody, FakeScroller, FakeScrollContent };
