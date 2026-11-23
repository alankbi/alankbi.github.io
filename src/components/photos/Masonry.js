import React, { useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';

const Wall = styled.div`
  position: relative;
  width: 100%;
  > * { box-sizing: border-box; min-width: 0; margin: 0; }
`;

// Keep DOM/tab order intact and prefer left-to-right placement for collection covers.
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
      let nextColumn = 0;
      Array.from(element.children).forEach((child, index) => {
        child.style.width = `${itemWidth}px`;
        child.style.position = 'absolute';
        const cardHeight = child.getBoundingClientRect().height;
        let column = index;
        if (index >= columns) {
          const shortest = heights.indexOf(Math.min(...heights));
          const heightDifference = heights[nextColumn] - heights[shortest];
          column = collections && heightDifference <= cardHeight / 2 ? nextColumn : shortest;
        }

        const top = heights[column];
        child.style.left = `${column * (itemWidth + columnGap)}px`;
        child.style.top = `${top}px`;
        heights[column] = top + cardHeight + rowGap;
        nextColumn = (column + 1) % columns;
      });
      element.style.height = `${Math.max(0, Math.max(...heights) - rowGap)}px`;
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
