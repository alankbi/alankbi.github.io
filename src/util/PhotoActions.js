const baseUrl = 'https://res.cloudinary.com/alanbi/image/upload';

export function getFullUrlForImage(imageName, imageFolder) {
  return `${baseUrl}/${imageFolder}/${imageName}`;
}

// Resize without cropping: each photograph keeps its original proportions.
export function getFullUrlForHeaderImage(imageName, imageFolder, width = 800) {
  return `${baseUrl}/c_limit,w_${width},q_auto,f_auto/${imageFolder}/${imageName}`;
}

export const photoGridSizes = '(max-width: 500px) 90vw, (max-width: 699px) 80vw, (max-width: 1124px) calc(40vw - 14px), (max-width: 1800px) calc(26.67vw - 19px), 461px';
export function getPhotoSrcSet(imageName, imageFolder, cover = false) {
  const url = cover ? getFullUrlForCollectionCover : getFullUrlForHeaderImage;
  return [480, 800, 1200].map(width => `${url(imageName, imageFolder, width)} ${width}w`).join(', ');
}

// Use an optimized display copy; reserve the original for explicit full-size opens.
export function getFullUrlForViewerImage(imageName, imageFolder, width = 2048) {
  return `${baseUrl}/c_limit,w_${width},h_${width},q_auto:good,f_auto/${imageFolder}/${imageName}`;
}

// Collection covers stay between square and 5:4 landscape. Conditional
// Cloudinary crops retain intermediate aspect ratios and avoid client cropping.
export function getFullUrlForCollectionCover(imageName, imageFolder, width = 800) {
  const crop = 'if_ar_lt_1/c_crop,ar_1:1,g_center/if_end/if_ar_gt_1.25/c_crop,ar_5:4,h_ih,g_center/if_end';
  return `${baseUrl}/${crop}/c_limit,w_${width},q_auto,f_auto/${imageFolder}/${imageName}`;
}

const positiveNumber = value => {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : null;
};
const formatNumber = value => String(Math.round(value * 10) / 10);

export function getMetadataStringFromExif(exifData) {
  if (!exifData) return '';
  const parts = [];
  const focalLength = positiveNumber(exifData.FocalLength);
  const recordedEquivalent = positiveNumber(exifData.FocalLengthIn35mmFormat)
    || positiveNumber(exifData.FocalLengthIn35mmFilm);
  // Only use a camera fallback we know. iPhone lenses/crops vary per shot;
  // their recorded 35mm equivalent takes precedence over any calculation.
  const cropFactor = /^X-T20$/i.test(String(exifData.Model || '').trim()) ? 1.5 : null;
  const equivalent = recordedEquivalent || (focalLength && cropFactor && focalLength * cropFactor);
  if (focalLength && equivalent) parts.push(`${formatNumber(focalLength)} mm (${formatNumber(equivalent)} mm full frame)`);
  else if (equivalent) parts.push(`${formatNumber(equivalent)} mm full frame`);
  else if (focalLength) parts.push(`${formatNumber(focalLength)} mm`);

  // exifr returns ApertureValue in APEX units. FNumber is the exposure f-stop.
  const apex = exifData.ApertureValue;
  const aperture = positiveNumber(exifData.FNumber)
    || (typeof apex === 'number' && Number.isFinite(apex) ? positiveNumber(2 ** (apex / 2)) : null);
  if (aperture) parts.push(`f/${formatNumber(aperture)}`);

  const exposure = positiveNumber(exifData.ExposureTime);
  if (exposure) parts.push(exposure >= 1 ? `${formatNumber(exposure)} s` : `1/${Math.round(1 / exposure)} s`);
  const iso = positiveNumber(exifData.ISO);
  if (iso) parts.push(`ISO ${iso}`);
  const model = typeof exifData.Model === 'string' ? exifData.Model.trim() : '';
  const make = typeof exifData.Make === 'string' ? exifData.Make.trim() : '';
  if (model) parts.push(make && !model.toLowerCase().startsWith(make.toLowerCase()) && make.toLowerCase() !== 'apple' ? `${make} ${model}` : model);
  return parts.join('  ·  ');
}
