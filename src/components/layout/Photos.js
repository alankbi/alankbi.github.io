import React, { useEffect } from 'react';
import styled from 'styled-components';
import PhotoItem from '../view/PhotoItem';
import PhotoCollections from '../../data/PhotoCollections';
import Masonry from '../photos/Masonry';
import { PhotoShell } from '../photos/PhotoStyles';

const PhotosIndexShell = styled(PhotoShell)`
  padding-top: 128px;
  @media (max-width: 600px) { padding-top: 57px; }
`;

export default function Photos() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <PhotosIndexShell>
      <Masonry collections>
        {Object.keys(PhotoCollections).map((collectionUrl, index) =>
          <PhotoItem key={collectionUrl} collectionUrl={collectionUrl} index={index} />)}
      </Masonry>
    </PhotosIndexShell>
  );
}
