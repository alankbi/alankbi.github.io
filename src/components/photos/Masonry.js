import React, { useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';

const Wall = styled.div`
  position: relative;
  width: 100%;
  > * { box-sizing: border-box; min-width: 0; margin: 0; }
`;

// Keep DOM/tab order intact and place each item in the next shortest column.
// Observe the cards as well as the wall so late-loading images reflow naturally.
export default function Masonry({ children, collections = false }) {
  const wall = useRef(null);
  useLayoutEffect(() => {
    const element = wall.current;
    let frame;
    const layout = () => {
      const width = element.clientWidth;
      const columns = width < 560 ? 1 : width < 900 ? 2 : 3;
      const columnGap = 36;
      // Captions already add space below each image, so keep row gaps tighter.
      const rowGap = width < 560 ? 28 : collections ? 24 : 22;
      const itemWidth = (width - columnGap * (columns - 1)) / columns;
      const heights = Array(columns).fill(0);
      Array.from(element.children).forEach((child, index) => {
        const column = index < columns ? index : heights.indexOf(Math.min(...heights));
        child.style.width = `${itemWidth}px`;
        child.style.position = 'absolute';
        child.style.left = `${column * (itemWidth + columnGap)}px`;
        child.style.top = `${heights[column]}px`;
        heights[column] += child.getBoundingClientRect().height + rowGap;
      });
      element.style.height = `${Math.max(0, ...heights) - rowGap}px`;
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(layout); };
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(schedule) : null;
    if (observer) {
      observer.observe(element);
      Array.from(element.children).forEach(child => observer.observe(child));
    }
    element.addEventListener('load', schedule, true);
    window.addEventListener('resize', schedule);
    layout();
    return () => {
      if (observer) observer.disconnect();
      cancelAnimationFrame(frame);
      element.removeEventListener('load', schedule, true);
      window.removeEventListener('resize', schedule);
    };
  }, [children, collections]);
  return <Wall ref={wall}>{children}</Wall>;
}
