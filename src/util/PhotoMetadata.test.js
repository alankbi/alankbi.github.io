import exif from 'exifr';
import { readPhotoMetadata } from './PhotoMetadata';
jest.mock('exifr', () => ({ parse: jest.fn() }));
beforeEach(() => { localStorage.clear(); global.fetch = jest.fn(); exif.parse.mockReset(); });

test('metadata fetch is bounded to a 64KB header and the formatted text persists', async () => {
  const header = new ArrayBuffer(64);
  fetch.mockResolvedValue({ status: 206, arrayBuffer: () => Promise.resolve(header) });
  exif.parse.mockResolvedValue({ Make: 'FUJIFILM', Model: 'X-T20', FocalLength: 18 });
  const text = await readPhotoMetadata('https://example.com/metadata-a.jpg');
  expect(fetch).toHaveBeenCalledWith('https://example.com/metadata-a.jpg', { headers: { Range: 'bytes=0-65535' } });
  expect(exif.parse.mock.calls[0][0]).toBe(header);
  expect(text).toContain('18 mm (27 mm full frame)');
  expect(await readPhotoMetadata('https://example.com/metadata-a.jpg')).toBe(text);
  expect(fetch).toHaveBeenCalledTimes(1);
  const saved = JSON.parse(localStorage.getItem('photo-metadata-v1:https://example.com/metadata-a.jpg'));
  expect(saved.text).toBe(text);
});

test('reads persisted metadata without a network request', async () => {
  localStorage.setItem('photo-metadata-v1:https://example.com/persisted.jpg', JSON.stringify({ text: 'camera text', time: Date.now() }));
  expect(await readPhotoMetadata('https://example.com/persisted.jpg')).toBe('camera text');
  expect(fetch).not.toHaveBeenCalled();
});

test('does not download the original body if a server ignores the Range request', async () => {
  const cancel = jest.fn(); const arrayBuffer = jest.fn();
  fetch.mockResolvedValue({ status: 200, body: { cancel }, arrayBuffer });
  expect(await readPhotoMetadata('https://example.com/ignores-range.jpg')).toBe('');
  expect(cancel).toHaveBeenCalled();
  expect(arrayBuffer).not.toHaveBeenCalled();
  expect(exif.parse).not.toHaveBeenCalled();
});
