import React from 'react';
import { render, fireEvent, cleanup, wait } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import Theme from '../../Theme';
import Content from './Content';
import { readPhotoMetadata } from '../../util/PhotoMetadata';

jest.mock('../../util/PhotoMetadata', () => ({ readPhotoMetadata: jest.fn() }));
window.scrollTo = jest.fn();
HTMLElement.prototype.scrollTo = jest.fn();
const base = '/photos/2025-05/china';
const open = (path = base) => {
  const history = createMemoryHistory({ initialEntries: [path] });
  return { ...render(<Theme><Router history={history}><Content /></Router></Theme>), history };
};
beforeEach(() => { sessionStorage.clear(); readPhotoMetadata.mockReset(); readPhotoMetadata.mockResolvedValue('48 mm full frame · f/1.8'); });
afterEach(cleanup);

test('opens as a grid regardless of old preferences; stable image links return to that grid', async () => {
  sessionStorage.setItem('photo-view', 'story');
  const page = open();
  expect(page.queryByText('Single')).toBeNull();
  expect(page.getByLabelText('View China, photograph 3').getAttribute('href')).toBe(base + '?photo=DSCF9488.jpg');
  fireEvent.click(page.getByLabelText('View China, photograph 3'));
  expect(page.getByAltText('China, photograph 3').getAttribute('src')).toContain('DSCF9488.jpg');
  expect(page.getByText('03 / 08')).toBeTruthy();
  await wait(() => expect(page.getByText(/48 mm/)).toBeTruthy());
  fireEvent.click(page.getByText('← Back to China'));
  expect(page.history.location.pathname).toBe(base);
  expect(page.history.location.search).toBe('');
  expect(page.getByLabelText('View China, photograph 3')).toBeTruthy();
  expect(document.body.style.overflow).toBe('');
});

test('direct photo URLs work; arrows update the URL; browser Back returns to the grid', async () => {
  const direct = open(base + '?photo=DSCF9488.jpg');
  expect(direct.getByText('03 / 08')).toBeTruthy();
  await act(async () => { await Promise.resolve(); });
  direct.unmount();
  const page = open();
  fireEvent.click(page.getByLabelText('View China, photograph 3'));
  fireEvent.click(page.getByLabelText('Next photograph'));
  expect(page.history.location.search).toBe('?photo=DSCF9709.jpg');
  expect(page.getByText('04 / 08')).toBeTruthy();
  await act(async () => { await Promise.resolve(); });
  act(() => { page.history.goBack(); });
  expect(page.history.location.search).toBe('');
  expect(page.getByLabelText('View China, photograph 4')).toBeTruthy();
});

test('keyboard clamps at collection ends; Escape returns to grid and frees scrolling', async () => {
  const page = open(base + '?photo=IMG_9707.jpg');
  fireEvent.keyDown(window, { key: 'ArrowLeft' });
  expect(page.getByText('01 / 08')).toBeTruthy();
  fireEvent.keyDown(window, { key: 'End' });
  expect(page.getByText('08 / 08')).toBeTruthy();
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  expect(page.getByText('08 / 08')).toBeTruthy();
  await act(async () => { await Promise.resolve(); });
  fireEvent.keyDown(window, { key: 'Escape' });
  expect(document.body.style.overflow).toBe('');
  fireEvent.keyDown(window, { key: 'ArrowLeft' });
  expect(page.history.location.search).toBe('');
});

test('missing EXIF still renders the photo; invalid photo URL falls back to grid', async () => {
  readPhotoMetadata.mockResolvedValue('');
  const page = open(base + '?photo=DSCF9732.jpg');
  expect(page.getByAltText('China, photograph 5')).toBeTruthy();
  await act(async () => { await Promise.resolve(); });
  expect(page.getByAltText('China, photograph 5')).toBeTruthy();
  page.unmount();
  expect(document.body.style.overflow).toBe('');
  const invalid = open(base + '?photo=missing.jpg');
  expect(invalid.getByLabelText('View China, photograph 1')).toBeTruthy();
});

test('horizontal swipes move once, while vertical swipes stay native', async () => {
  const page = open(base + '?photo=IMG_9707.jpg');
  const stage = page.getByLabelText('China single photograph view');
  const touch = (x, y, identifier = 1) => ({ clientX: x, clientY: y, identifier });
  const swipe = (start, end) => {
    fireEvent.touchStart(stage, { touches: [start] });
    fireEvent.touchEnd(stage, { touches: [], changedTouches: [end] });
  };
  swipe(touch(280, 200), touch(80, 200));
  expect(page.getByText('02 / 08')).toBeTruthy();
  expect(fireEvent.click(page.getByLabelText('Open China, photograph 2, at full size'))).toBe(false);
  fireEvent.touchEnd(stage, { touches: [], changedTouches: [touch(80, 200)] });
  swipe(touch(100, 100), touch(105, 108));
  expect(page.getByText('02 / 08')).toBeTruthy();
  swipe(touch(100, 300), touch(100, 100));
  expect(page.getByText('02 / 08')).toBeTruthy();
  swipe(touch(100, 200), touch(280, 200));
  expect(page.getByText('01 / 08')).toBeTruthy();
  fireEvent.touchStart(stage, { touches: [touch(100, 300)] });
  fireEvent.touchMove(stage, { touches: [touch(100, 200), touch(200, 200, 2)] });
  fireEvent.touchEnd(stage, { touches: [], changedTouches: [touch(100, 100)] });
  expect(page.getByText('01 / 08')).toBeTruthy();
  fireEvent.touchStart(stage, { touches: [touch(100, 300)] });
  fireEvent.touchCancel(stage);
  fireEvent.touchEnd(stage, { touches: [], changedTouches: [touch(100, 100)] });
  expect(page.getByText('01 / 08')).toBeTruthy();
  await act(async () => { await Promise.resolve(); });
});


test('native scroll updates the selected photo and URL, without consuming wheel events', async () => {
  const page = open(base + '?photo=IMG_9707.jpg');
  const stage = page.getByLabelText('China single photograph view');
  Object.defineProperty(stage, 'clientHeight', { value: 600 });
  expect(fireEvent.wheel(stage, { deltaY: 90 })).toBe(true);
  stage.scrollTop = 1200;
  fireEvent.scroll(stage);
  expect(page.getByText('03 / 08')).toBeTruthy();
  expect(page.history.location.search).toBe('?photo=DSCF9488.jpg');
  stage.scrollTop = 600;
  fireEvent.scroll(stage);
  expect(page.getByText('02 / 08')).toBeTruthy();
  await act(async () => { await Promise.resolve(); });
});

test('rapid arrow navigation has one metadata panel and uses the latest destination', async () => {
  const page = open(base + '?photo=IMG_9707.jpg');
  const stage = page.getByLabelText('China single photograph view');
  Object.defineProperty(stage, 'clientHeight', { value: 600 });
  for (let i = 0; i < 6; i += 1) fireEvent.click(page.getByLabelText('Next photograph'));
  expect(page.getByText('07 / 08')).toBeTruthy();
  expect(stage.style.scrollSnapType).toBe('none');
  expect(page.getAllByLabelText('Photo metadata').length).toBe(1);
  await act(async () => { await Promise.resolve(); });
  expect(page.getAllByText(/48 mm/).length).toBe(1);
});

test('slow scrolling fades stationary layers without showing a vertical image strip', async () => {
  const page = open(base + '?photo=IMG_9707.jpg');
  const stage = page.getByLabelText('China single photograph view');
  Object.defineProperty(stage, 'clientHeight', { value: 600 });
  stage.scrollTop = 150;
  fireEvent.scroll(stage);
  expect(page.getByLabelText('Photograph 1').style.opacity).toBe('0.5');
  expect(page.getByLabelText('Photograph 2').style.opacity).toBe('0');
  stage.scrollTop = 450;
  fireEvent.scroll(stage);
  expect(page.getByLabelText('Photograph 1').style.opacity).toBe('0');
  expect(page.getByLabelText('Photograph 2').style.opacity).toBe('0.5');
  expect(page.getAllByLabelText('Photo metadata').length).toBe(1);
  expect(page.queryByText(/Full-frame comparison/)).toBeNull();
  await act(async () => { await Promise.resolve(); });
});


test('grid uses responsive thumbnails and never starts display-size image or metadata requests', () => {
  const page = open();
  expect(readPhotoMetadata).not.toHaveBeenCalled();
  const thumbnail = page.getByLabelText('View China, photograph 1').querySelector('img');
  expect(thumbnail.getAttribute('src')).toContain('w_800');
  expect(thumbnail.getAttribute('srcset')).toContain('480w');
  expect(thumbnail.getAttribute('srcset')).toContain('1200w');
  expect(thumbnail.getAttribute('sizes')).toBeTruthy();
  expect(page.container.querySelector('img[src*="w_2048"]')).toBeNull();
});

test('loads selected photo, then one previous and two next; prefetch never cascades', async () => {
  const page = open(base + '?photo=DSCF9488.jpg');
  const displayImages = () => [...page.container.querySelectorAll('img[src*="w_2048"]')];
  expect(displayImages().length).toBe(1);
  fireEvent.load(page.getByAltText('China, photograph 3'));
  expect(displayImages().length).toBe(4);
  expect(page.getByAltText('China, photograph 2').hasAttribute('src')).toBe(true);
  expect(page.getByAltText('China, photograph 1').hasAttribute('src')).toBe(false);
  expect(page.getByAltText('China, photograph 6').hasAttribute('src')).toBe(false);
  fireEvent.load(page.getByAltText('China, photograph 4'));
  fireEvent.load(page.getByAltText('China, photograph 5'));
  expect(displayImages().length).toBe(4);
  fireEvent.click(page.getByLabelText('Next photograph'));
  expect(displayImages().length).toBe(5);
  expect(page.getByAltText('China, photograph 6').getAttribute('src')).toContain('w_2048');
  expect(page.getByAltText('China, photograph 7').hasAttribute('src')).toBe(false);
  expect(page.getByLabelText('Open China, photograph 4, at full size').getAttribute('href')).not.toContain('w_2048');
  await act(async () => { await Promise.resolve(); });
});

test('clicking a loaded thumbnail reuses it until the optimized viewer copy arrives', async () => {
  const page = open();
  const link = page.getByLabelText('View China, photograph 1');
  const thumbnail = link.querySelector('img');
  Object.defineProperty(thumbnail, 'complete', { value: true });
  Object.defineProperty(thumbnail, 'naturalWidth', { value: 800 });
  Object.defineProperty(thumbnail, 'currentSrc', { value: 'https://cached-thumbnail.example/photo.jpg' });
  fireEvent.click(link, { detail: 1 });
  expect(page.container.querySelector('img[src="https://cached-thumbnail.example/photo.jpg"]')).toBeTruthy();
  fireEvent.load(page.getByAltText('China, photograph 1'));
  expect(page.container.querySelector('img[src="https://cached-thumbnail.example/photo.jpg"]')).toBeNull();
  fireEvent.click(page.getByText('← Back to China'), { detail: 1 });
  await act(async () => { await Promise.resolve(); });
  expect(document.activeElement).not.toBe(page.getByLabelText('View China, photograph 1'));
});


test('all loaded grid thumbnails remain available when moving quickly between photos', async () => {
  const page = open();
  for (const number of [4, 5, 6]) {
    const image = page.getByLabelText(`View China, photograph ${number}`).querySelector('img');
    Object.defineProperty(image, 'complete', { value: true });
    Object.defineProperty(image, 'naturalWidth', { value: 800 });
    Object.defineProperty(image, 'currentSrc', { value: `https://cached-thumbnail.example/${number}.jpg` });
    fireEvent.load(image);
  }
  fireEvent.click(page.getByLabelText('View China, photograph 5'), { detail: 1 });
  expect(page.container.querySelector('img[src="https://cached-thumbnail.example/4.jpg"]')).toBeTruthy();
  expect(page.container.querySelector('img[src="https://cached-thumbnail.example/5.jpg"]')).toBeTruthy();
  expect(page.container.querySelector('img[src="https://cached-thumbnail.example/6.jpg"]')).toBeTruthy();
  fireEvent.click(page.getByLabelText('Next photograph'));
  expect(page.getByText('06 / 08')).toBeTruthy();
  expect(page.container.querySelector('img[src="https://cached-thumbnail.example/6.jpg"]')).toBeTruthy();
  expect(page.getByRole('status').textContent).toBe('Loading larger photo…');
  await act(async () => { await Promise.resolve(); });
});

test('a direct middle-photo link loads previous and next two, and shows a loading status meanwhile', async () => {
  const page = open(base + '?photo=DSCF9732.jpg');
  expect(page.getByRole('status').textContent).toBe('Loading photo…');
  expect(page.getByAltText('China, photograph 4').hasAttribute('src')).toBe(false);
  fireEvent.load(page.getByAltText('China, photograph 5'));
  expect(page.queryByRole('status')).toBeNull();
  for (const number of [4, 5, 6, 7]) expect(page.getByAltText(`China, photograph ${number}`).hasAttribute('src')).toBe(true);
  for (const number of [1, 2, 3, 8]) expect(page.getByAltText(`China, photograph ${number}`).hasAttribute('src')).toBe(false);
  await act(async () => { await Promise.resolve(); });
});

test('keyboard fade takes 450ms and wheel input cancels it immediately', async () => {
  const frames = new Map(); let nextId = 0;
  const raf = jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => { const id = ++nextId; frames.set(id, callback); return id; });
  const cancel = jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(id => frames.delete(id));
  const frame = time => act(() => { const callbacks = [...frames.values()]; frames.clear(); callbacks.forEach(callback => callback(time)); });
  try {
    const page = open(base + '?photo=IMG_9707.jpg');
    const stage = page.getByLabelText('China single photograph view');
    Object.defineProperty(stage, 'clientHeight', { value: 600 });
    fireEvent.keyDown(window, { key: 'ArrowDown' });
    frame(0); frame(112.5);
    expect(Number(page.getByLabelText('Photograph 1').style.opacity)).toBeCloseTo(.5);
    frame(225);
    expect(stage.scrollTop).toBe(600);
    expect(page.getByLabelText('Photograph 2').style.opacity).toBe('0');
    frame(337.5);
    expect(Number(page.getByLabelText('Photograph 2').style.opacity)).toBeCloseTo(.5);
    frame(450);
    expect(page.getByLabelText('Photograph 2').style.opacity).toBe('1');
    expect(stage.style.scrollSnapType).toBe('');
    fireEvent.keyDown(window, { key: 'ArrowDown' });
    expect(stage.style.scrollSnapType).toBe('none');
    expect(fireEvent.wheel(stage, { deltaY: 20 })).toBe(true);
    expect(page.getByText('02 / 08')).toBeTruthy();
    expect(stage.style.scrollSnapType).toBe('');
    const position = stage.scrollTop;
    frame(1500);
    expect(stage.scrollTop).toBe(position);
    await act(async () => { await Promise.resolve(); });
    page.unmount();
  } finally { raf.mockRestore(); cancel.mockRestore(); }
});


test('scrolling from photo 1 to photo 5 replaces its cached thumbnail with the optimized viewer image', async () => {
  const page = open();
  for (const number of [1, 5]) {
    const image = page.getByLabelText(`View China, photograph ${number}`).querySelector('img');
    Object.defineProperty(image, 'complete', { value: true });
    Object.defineProperty(image, 'naturalWidth', { value: 800 });
    Object.defineProperty(image, 'currentSrc', { value: `https://cached-thumbnail.example/${number}.jpg` });
    fireEvent.load(image);
  }
  fireEvent.click(page.getByLabelText('View China, photograph 1'), { detail: 1 });
  fireEvent.load(page.getByAltText('China, photograph 1'));
  const stage = page.getByLabelText('China single photograph view');
  Object.defineProperty(stage, 'clientHeight', { value: 600 });
  stage.scrollTop = 2400;
  fireEvent.scroll(stage);
  const sharpImage = page.getByAltText('China, photograph 5');
  expect(sharpImage.getAttribute('src')).toContain('c_limit,w_2048,h_2048,q_auto:good,f_auto');
  expect(sharpImage.style.opacity).toBe('0');
  expect(page.container.querySelector('img[src="https://cached-thumbnail.example/5.jpg"]')).toBeTruthy();
  expect(page.getByRole('status').textContent).toBe('Loading larger photo…');
  fireEvent.load(sharpImage);
  expect(sharpImage.style.opacity).toBe('1');
  expect(page.container.querySelector('img[src="https://cached-thumbnail.example/5.jpg"]')).toBeNull();
  expect(page.queryByRole('status')).toBeNull();
  await act(async () => { await Promise.resolve(); });
});

test('a failed optimized image is identified rather than silently remaining a thumbnail', async () => {
  const page = open(base + '?photo=DSCF9732.jpg');
  fireEvent.error(page.getByAltText('China, photograph 5'));
  expect(page.getByRole('status').textContent).toContain('Larger photo unavailable');
  expect(page.getByLabelText('Open China, photograph 5, at full size').getAttribute('href')).not.toContain('w_2048');
  await act(async () => { await Promise.resolve(); });
});
