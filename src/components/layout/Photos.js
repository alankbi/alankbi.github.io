import React, { useEffect } from 'react';
import PhotoItem from '../view/PhotoItem';
import PhotoCollections from '../../data/PhotoCollections';
import Masonry from '../photos/Masonry';
import { PhotoShell } from '../photos/PhotoStyles';

export default function Photos() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <PhotoShell>
      <Masonry collections>
        {Object.keys(PhotoCollections).map((collectionUrl, index) =>
          <PhotoItem key={collectionUrl} collectionUrl={collectionUrl} index={index} />)}
      </Masonry>
    </PhotoShell>
  );
}
