const baseUrl = 'https://res.cloudinary.com/alanbi/image/upload';

const headerImageSettings = 'ar_5:4,c_fill,g_auto' // aspect ratio 5:4, center fill, gravity auto

export function getFullUrlForImage(imageName, imageFolder) {
  return `${baseUrl}/${imageFolder}/${imageName}`;
}

export function getFullUrlForHeaderImage(imageName, imageFolder) {
  return `${baseUrl}/${headerImageSettings}/${imageFolder}/${imageName}`;
}