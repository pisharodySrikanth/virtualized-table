import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { WindowScroller } from 'react-virtualized';
import { debounce } from 'lodash';
import { FakeScroller, FakeScrollContent } from './style';

const recomputeDebounceTimeout = 1000;

const ScrollHandler = forwardRef(
  ({ children, scrollContainer, width, totalColumnWidth }, componentRef) => {
    const scrollChildRef = useRef(null);
    const headerRef = useRef(null);
    const gridRef = useRef(null);
    const fakeScrollerRef = useRef(null);
    const [stickyScroller, setStickyScroller] = useState(true);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [scrolling, setScrolling] = useState(false);

    // exposing api for resetting
    useImperativeHandle(componentRef, () => ({
      recompute: () => {
        setScrollLeft(0);
        setScrolling(false);
      },
    }));

    // updating fake scroller if scrolled on grid body
    useEffect(() => {
      if (
        !fakeScrollerRef.current ||
        fakeScrollerRef.current.scrollLeft === scrollLeft
      ) {
        return;
      }

      fakeScrollerRef.current.scrollLeft = scrollLeft;
    }, [scrollLeft]);

    // update sticky status of fake scroller on each update if not scrolling
    useEffect(() => {
      if (!scrollChildRef.current || scrolling) {
        return;
      }

      const clientRect = scrollChildRef.current.getBoundingClientRect();

      setStickyScroller(clientRect.bottom > window.innerHeight);
    });

    // reset scrolling flag when scroll stops
    const setNotScrolling = useCallback(
      debounce(() => {
        setScrolling(false);
      }, 100),
      [],
    );

    const handleScroll = useCallback(({ scrollLeft: paramScrollLeft }) => {
      setScrollLeft(paramScrollLeft);
      setScrolling(true);
      setNotScrolling();
    }, []);

    // call virtualized recompute when window scroller detects resize
    const onResize = useCallback(
      debounce(() => {
        if (!headerRef.current || !gridRef.current) {
          return;
        }
        headerRef.current.recomputeGridSize();
        gridRef.current.recomputeGridSize();
      }, recomputeDebounceTimeout),
      [],
    );

    return (
      <>
        <WindowScroller
          scrollElement={scrollContainer || window}
          onResize={onResize}
        >
          {({ height, isScrolling, scrollTop, registerChild }) => (
            <div
              ref={ref => {
                scrollChildRef.current = ref;
                registerChild(ref);
              }}
            >
              {children({
                height,
                onScroll: handleScroll,
                isScrolling: isScrolling || scrolling,
                scrollTop,
                scrollLeft,
                headerRef,
                gridRef,
              })}
              {totalColumnWidth > width ? (
                <FakeScroller
                  style={{ width }}
                  sticky={stickyScroller}
                  onScroll={e => handleScroll(e.target)}
                  ref={fakeScrollerRef}
                >
                  <FakeScrollContent style={{ width: totalColumnWidth }} />
                </FakeScroller>
              ) : null}
            </div>
          )}
        </WindowScroller>
        {createPortal(
          // added to prevent the lag issue between header and body scroll
          <canvas
            style={{
              position: 'absolute',
              top: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            }}
          />,
          document.body,
        )}
      </>
    );
  },
);

ScrollHandler.propTypes = {
  children: PropTypes.func.isRequired,
  scrollContainer: PropTypes.node,
  width: PropTypes.number.isRequired,
  totalColumnWidth: PropTypes.number.isRequired,
};

ScrollHandler.displayName = 'ScrollHandler';

export default ScrollHandler;
