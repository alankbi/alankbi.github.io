import exif from 'exifr';
import { getMetadataStringFromExif } from './PhotoActions';

const pending = new Map();
const prefix = 'photo-metadata-v1:';
const ttl = 30 * 24 * 60 * 60 * 1000;
const tags = ['Make', 'Model', 'FocalLength', 'FocalLengthIn35mmFormat', 'FocalLengthIn35mmFilm', 'FNumber', 'ApertureValue', 'ExposureTime', 'ISO'];

// Only request the JPEG header, never the original photo body for captions.
// Persist the small formatted string so returning visitors need no EXIF request.
export function readPhotoMetadata(url) {
  try {
    const saved = JSON.parse(localStorage.getItem(prefix + url));
    if (saved && typeof saved.text === 'string' && Date.now() - saved.time < ttl) return Promise.resolve(saved.text);
  } catch { /* Storage is optional. */ }
  if (!pending.has(url)) {
    pending.set(url, (async () => {
      const response = await fetch(url, { headers: { Range: 'bytes=0-65535' } });
      if (response.status !== 206) {
        if (response.body) await response.body.cancel();
        return '';
      }
      const header = await response.arrayBuffer();
      if (header.byteLength > 65536) return '';
      const data = await exif.parse(header, { pick: tags });
      const text = getMetadataStringFromExif(data);
      try { localStorage.setItem(prefix + url, JSON.stringify({ text, time: Date.now() })); } catch { /* Storage is optional. */ }
      return text;
    })().catch(() => ''));
  }
  return pending.get(url);
}
