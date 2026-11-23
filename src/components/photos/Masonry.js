import React, { useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';

const Wall = styled.div`
  position: relative;
  width: 100%;
  > * { box-sizing: border-box; min-width: 0; margin: 0; }
`;

// Keep DOM/tab order intact and prefer left-to-right placement unless a column falls far behind.
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
      const previousCardHeights = Array(columns).fill(0);
      const columnsInOrder = heights.map((_, column) => column);
      let pendingColumns = [];
      Array.from(element.children).forEach(child => {
        child.style.width = `${itemWidth}px`;
        child.style.position = 'absolute';
        const cardHeight = child.getBoundingClientRect().height;
        const shortestTop = Math.min(...heights);

        // Keep deferred columns in play. A used column can rejoin as soon as
        // its next slot is level with the shortest, within one vertical gap.
        pendingColumns = columnsInOrder.filter(column =>
          !pendingColumns.length || pendingColumns.includes(column) || heights[column] - shortestTop <= rowGap
        );
        let column = pendingColumns[0];
        const shortestPending = pendingColumns.reduce((best, next) =>
          heights[next] < heights[best] ? next : best);
        if (heights[column] - heights[shortestPending] > previousCardHeights[column] / 2) {
          column = shortestPending;
        }

        // Use the actual incoming image height, excluding its caption. Only skip
        // the preferred slot if the shorter column saves at least 75% of an image.
        const image = child.querySelector('img');
        const imageHeight = (image && image.getBoundingClientRect().height) || cardHeight;
        if (imageHeight > 0 && heights[column] - shortestTop >= 0.75 * imageHeight) {
          column = heights.indexOf(shortestTop);
        }
        pendingColumns = pendingColumns.filter(next => next !== column);

        const top = heights[column];
        child.style.left = `${column * (itemWidth + columnGap)}px`;
        child.style.top = `${top}px`;
        heights[column] = top + cardHeight + rowGap;
        previousCardHeights[column] = cardHeight;
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
