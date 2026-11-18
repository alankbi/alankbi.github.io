import { getMetadataStringFromExif, getFullUrlForHeaderImage, getFullUrlForCollectionCover, getFullUrlForViewerImage, getPhotoSrcSet } from './PhotoActions';

test('prefers recorded 35mm equivalent, including iPhone digital crops', () => {
  expect(getMetadataStringFromExif({ Model: 'iPhone 14 Pro', FocalLength: 6.86, FocalLengthIn35mmFormat: 48, FNumber: 1.78, ApertureValue: 1.66, ExposureTime: 1 / 5000, ISO: 64 }))
    .toBe('6.9 mm (48 mm full frame)  ·  f/1.8  ·  1/5000 s  ·  ISO 64  ·  iPhone 14 Pro');
});

test('uses X-T20 fallback only when recorded equivalent is unavailable', () => {
  expect(getMetadataStringFromExif({ Model: 'X-T20', FocalLength: 18, FocalLengthIn35mmFormat: 0 })).toBe('18 mm (27 mm full frame)  ·  X-T20');
  expect(getMetadataStringFromExif({ Model: 'X-T20', FocalLength: 18, FocalLengthIn35mmFormat: 35 })).toBe('18 mm (35 mm full frame)  ·  X-T20');
});

test('does not invent crop factors for unknown cameras or iPhones', () => {
  expect(getMetadataStringFromExif({ Model: 'iPhone 14 Pro', FocalLength: 6.86 })).toBe('6.9 mm  ·  iPhone 14 Pro');
});

test('converts raw APEX only as an aperture fallback', () => {
  expect(getMetadataStringFromExif({ ApertureValue: 5 })).toBe('f/5.7');
  expect(getMetadataStringFromExif({ ApertureValue: 0 })).toBe('f/1');
  expect(getMetadataStringFromExif({ FNumber: 5.6, ApertureValue: 5 })).toBe('f/5.6');
});

test('handles absent, zero, and invalid metadata without breaking the photograph', () => {
  [undefined, null, {}, { FocalLength: 0, ISO: NaN, ExposureTime: -1, FNumber: Infinity }].forEach(value => {
    expect(getMetadataStringFromExif(value)).toBe('');
  });
  expect(getMetadataStringFromExif({ ExposureTime: 2.5 })).toBe('2.5 s');
});

test('thumbnails resize without a crop or forced aspect ratio', () => {
  const url = getFullUrlForHeaderImage('photo.jpg', 'collection');
  expect(url).toContain('c_limit,w_800');
  expect(url).not.toMatch(/c_fill|ar_5:4|g_auto/);
});


test('collection covers request bounded Cloudinary crops', () => {
  const url = getFullUrlForCollectionCover('photo.jpg', 'collection');
  expect(url).toContain('if_ar_lt_1/c_crop,ar_1:1,g_center/if_end');
  expect(url).toContain('if_ar_gt_1.25/c_crop,ar_5:4,h_ih,g_center/if_end');
});

test('includes camera model without duplicated make or empty camera fields', () => {
  expect(getMetadataStringFromExif({ Make: 'FUJIFILM', Model: 'X-T20', FocalLength: 18, FNumber: 2.8, ISO: 400 }))
    .toBe('18 mm (27 mm full frame)  ·  f/2.8  ·  ISO 400  ·  FUJIFILM X-T20');
  expect(getMetadataStringFromExif({ Make: 'FUJIFILM', Model: 'FUJIFILM X-T20' })).toBe('FUJIFILM X-T20');
  expect(getMetadataStringFromExif({ Make: 'Apple', Model: 'iPhone 14 Pro' })).toBe('iPhone 14 Pro');
});

test('viewer images are optimized and capped; thumbnail srcsets have only three shared widths', () => {
 expect(getFullUrlForViewerImage('a.jpg','album')).toContain('c_limit,w_2048,h_2048,q_auto:good,f_auto');
 expect(getFullUrlForViewerImage('a.jpg','album',1280)).toContain('w_1280,h_1280');
 expect(getPhotoSrcSet('a.jpg','album').match(/\d+w(?=,|$)/g)).toEqual(['480w','800w','1200w']);
});
