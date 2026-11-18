# Collection design alternatives

## Saved hover overlay

Alan asked to retain this option while trying small captions below the covers.
The title and photo count fade in over a dark bottom gradient on hover or keyboard focus; touch devices keep them visible.
To restore it, use this saved `PhotoItem.js` component.

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PhotoCollections from '../../data/PhotoCollections';
import { getFullUrlForCollectionCover, getPhotoSrcSet, photoGridSizes } from '../../util/PhotoActions';
import { ImageFrame } from '../photos/PhotoStyles';

const Card = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
`;
const Caption = styled.div`
  position: absolute; bottom: 0; left: 0; right: 0; z-index: 1;
  display: flex; align-items: flex-end; justify-content: space-between; gap: 16px;
  padding: 72px 22px 22px;
  color: #fff;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, .42) 48%, rgba(0, 0, 0, .84));
  pointer-events: none;
  transition: opacity 240ms ease, transform 240ms ease;
  h2 { font-size: 21px; font-weight: 500; line-height: 1.2; margin: 0; letter-spacing: -.02em; }
  span { font-size: 12px; line-height: 1.6; color: #fff; white-space: nowrap; }
  @media (hover: hover) and (pointer: fine) { opacity: 0; transform: translateY(6px); }
  ${Card}:hover &, ${Card}:focus-visible & { opacity: 1; transform: translateY(0); }
  @media (prefers-reduced-motion: reduce) { transition: none; transform: none; }
`;

// Cloudinary delivers covers between square and 5:4 landscape.
const CoverFrame = styled(ImageFrame)`
  overflow: hidden;
  height: 0;
  padding-top: 100%;
  img { position: absolute; inset: 0; width: 100%; height: 100%; max-height: none; object-fit: cover; object-position: center; aspect-ratio: auto; }
`;

export default function PhotoItem({ collectionUrl, index }) {
  const collection = PhotoCollections[collectionUrl];
  return (
    <Card to={'/photos/' + collectionUrl} aria-label={`${collection.title}, ${collection.content.length} photos`}>
      <CoverFrame>
        <img src={getFullUrlForCollectionCover(collection.content[0], collection.imageFolder)}
          srcSet={getPhotoSrcSet(collection.content[0], collection.imageFolder, true)} sizes={photoGridSizes}
          onLoad={event => {
            const image = event.currentTarget;
            const ratio = Math.min(5 / 4, Math.max(1, image.naturalWidth / image.naturalHeight));
            image.parentElement.style.paddingTop = `${100 / ratio}%`;
          }}
          alt="" loading={index < 2 ? 'eager' : 'lazy'} />
        <Caption>
          <h2>{collection.title}</h2>
          <span>{String(collection.content.length).padStart(2, '0')} photos →</span>
        </Caption>
      </CoverFrame>
    </Card>
  );
}
```
