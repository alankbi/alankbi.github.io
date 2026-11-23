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
  @media (hover: hover) and (pointer: fine) {
    img { transition: filter 220ms ease; }
    &:hover img { filter: brightness(.91); }
  }
  @media (prefers-reduced-motion: reduce) { img { transition: none; } }
`;
const Caption = styled.div`
  display: flex; align-items: baseline; justify-content: space-between; gap: 16px;
  padding: 12px 0 4px;
  color: #888; font-size: 11px; letter-spacing: .08em; line-height: 1.6;
  h2 { font: inherit; margin: 0; }
  span { white-space: nowrap; }
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
      </CoverFrame>
      <Caption>
        <h2>{collection.title}</h2>
        <span>{String(collection.content.length).padStart(2, '0')} photos →</span>
      </Caption>
    </Card>
  );
}
