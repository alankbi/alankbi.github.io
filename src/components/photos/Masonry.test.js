import React from 'react';
import { cleanup, render } from '@testing-library/react';
import Masonry from './Masonry';

let width;

beforeEach(() => {
  width = 1200;
  jest.spyOn(Element.prototype, 'clientWidth', 'get').mockImplementation(() => width);
  jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function () {
    return { height: Number(this.getAttribute('data-height') || 0) };
  });
});

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
});

function placeCards(heights, collections = false) {
  const { container } = render(
    <Masonry collections={collections}>
      {heights.map((height, index) => <div key={index} data-height={height} />)}
    </Masonry>
  );
  const wall = container.firstChild;
  return { wall, cards: Array.from(wall.children) };
}

test.each([960, 1200, 1440])('Iceland fills all three columns in order at grid width %i', gridWidth => {
  width = gridWidth;
  // Width and height metadata only, in the collection's chosen order.
  const dimensions = [
    [6000, 4000], [5351, 4000], [3880, 5141],
    [3277, 4369], [4920, 3458], [4946, 3242],
    [3981, 2986], [3024, 4032], [3702, 5159],
  ];
  const cardWidth = (width - 72) / 3;
  const heights = dimensions.map(([w, h]) => cardWidth * h / w + 29);
  const { cards, wall } = placeCards(heights);
  expect(cards.map(card => parseFloat(card.style.left))).toEqual(
    [0, 1, 2, 0, 1, 2, 0, 1, 2].map(column => column * (cardWidth + 36))
  );
  cards.slice(0, 3).forEach(card => expect(card.style.top).toBe('0px'));
  cards.slice(3).forEach((card, index) => {
    const previous = cards[index];
    expect(parseFloat(card.style.top)).toBeCloseTo(parseFloat(previous.style.top) + heights[index] + 22);
  });
  const bottom = Math.max(...cards.map((card, index) => parseFloat(card.style.top) + heights[index]));
  expect(parseFloat(wall.style.height)).toBeCloseTo(bottom);
});

test('a gap equal to half the previous photo height keeps left-to-right order', () => {
  const { cards } = placeCards([400, 600, 300, 300, 300, 300]);
  expect(cards.map(card => parseFloat(card.style.left))).toEqual([0, 412, 824, 0, 412, 824]);
});

test('balancing a gap over 50% still fills each column once in that pass', () => {
  const { cards } = placeCards([400, 602, 300, 300, 300, 300]);
  expect(cards.map(card => parseFloat(card.style.left))).toEqual([0, 412, 824, 0, 824, 412]);
});

test('collection covers retain their left-to-right order', () => {
  const { cards } = placeCards([310, 310, 310, 350, 270], true);
  expect(cards.map(card => parseFloat(card.style.left))).toEqual([0, 412, 824, 0, 412]);
});

test('two columns alternate without leaving a column unfilled', () => {
  width = 700;
  const { cards } = placeCards([310, 310, 310, 350, 270]);
  expect(cards.map(card => parseFloat(card.style.left))).toEqual([0, 368, 0, 368, 0]);
});

test('mobile stacks cards with the existing spacing', () => {
  width = 375;
  const { cards, wall } = placeCards([300, 400, 200]);
  expect(cards.map(card => parseFloat(card.style.left))).toEqual([0, 0, 0]);
  expect(cards.map(card => parseFloat(card.style.top))).toEqual([0, 328, 756]);
  expect(wall.style.height).toBe('956px');
});
