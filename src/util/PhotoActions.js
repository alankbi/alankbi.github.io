const baseUrl = 'https://res.cloudinary.com/alanbi/image/upload';

const headerImageSettings = 'ar_5:4,c_fill,g_auto' // aspect ratio 5:4, center fill, gravity auto

export function getFullUrlForImage(imageName, imageFolder) {
  return `${baseUrl}/${imageFolder}/${imageName}`;
}

export function getFullUrlForHeaderImage(imageName, imageFolder) {
  return `${baseUrl}/${headerImageSettings}/${imageFolder}/${imageName}`;
}

export function getMetadataStringFromExif(exifData) {
  const separator = '    ';
  let metadata = '';
  if ('FocalLengthIn35mmFormat' in exifData) {
    metadata += `${exifData.FocalLengthIn35mmFormat}mm` + separator;
  }
  if ('ApertureValue' in exifData) {
    metadata += `f${exifData.ApertureValue.toFixed(1)}` + separator;
  }
  if ('ExposureTime' in exifData) {
    const shutterSpeed = exifData.ExposureTime >= 1
      ? exifData.ExposureTime + 's'
      : `1/${Math.round(1 / exifData.ExposureTime)}s`;
    metadata += shutterSpeed + separator;
  }
  if ('ISO' in exifData) {
    metadata += `ISO${exifData.ISO}`;
  }
  return metadata.trim();
}
