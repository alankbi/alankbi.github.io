import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {GrayText, HeaderText, SmallGrayText} from '../view/Text';
import {
  CenteredContainer, PhotoCollectionsContainer, PhotoContentContainer, PhotoContentControlsContainer
} from '../view/Container';
import { CollectionImage } from '../view/Image';
import NotFound from './NotFound'
import { withTheme } from 'styled-components';
import PhotoCollections from '../../data/PhotoCollections';
import { getFullUrlForImage } from '../../util/PhotoActions';
import { SmallGrayTextButton } from '../view/Button';

function PhotosPage() {
  const params = useParams();
  const [pageNumber, setPageNumber] = useState(0);
  const [pages, setPages] = useState({})
  const numPages = PhotoCollections[params.collectionUrl]?.content?.length + 1 ?? 1;
  const safeSetPageNumber = (newPageNumber) => {
    if (newPageNumber < 0) {
      setPageNumber(0);
    } else if (newPageNumber >= numPages) {
      setPageNumber(numPages - 1);
    } else {
      setPageNumber(newPageNumber);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        safeSetPageNumber(pageNumber + 1);
      } else if (e.key === 'ArrowUp') {
        safeSetPageNumber(pageNumber - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [pageNumber]);

  let collection = null;
  if (params.collectionUrl in PhotoCollections) {
    collection = PhotoCollections[params.collectionUrl];
  } else {
    return <NotFound/>;
  }

  const fetchContent = (pageNumber) => {
    if (pageNumber === 0)
    {
      return (
        <CenteredContainer>
          <HeaderText>{collection.title}</HeaderText>
          <GrayText>{collection.subtitle}</GrayText>
          <br/>
          <br/>
          <GrayText>&#8595;</GrayText>
        </CenteredContainer>
      );
    }

    const imageName = collection.content[pageNumber - 1];
    const imageUrl = getFullUrlForImage(imageName, collection.imageFolder);
    return (
      // <div>
        <CollectionImage src={imageUrl} />
        // <GrayText>test</GrayText>
      // </div>
    )
  };

  const getCachedContent = (pageNumber) => {
    if (pages[pageNumber]) {
      return pages[pageNumber];
    }

    const newContent = fetchContent(pageNumber);

    setPages((prevPages) => ({
      ...prevPages,
      [pageNumber]: newContent,
    }));

    return newContent;
  };

  return (
    <PhotoCollectionsContainer>
      <PhotoContentContainer>
        {getCachedContent(pageNumber)}
      </PhotoContentContainer>
      <PhotoContentControlsContainer>
        <SmallGrayText>Page {pageNumber + 1} of {numPages}</SmallGrayText>
        <SmallGrayTextButton onClick={() => setPageNumber(0)}>(to top)</SmallGrayTextButton>
      </PhotoContentControlsContainer>
    </PhotoCollectionsContainer>
  );
}

export default withTheme(PhotosPage);
