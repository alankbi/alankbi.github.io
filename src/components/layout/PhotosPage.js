import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GrayText, HeaderText, PhotoMetadataText, SmallGrayText } from '../view/Text';
import {
  AbsoluteFlexContainer,
  CenteredContainer, HeaderContainer,
  PhotoCollectionsContainer,
  PhotoContentControlsContainer, PhotoTransitionStylesContainer
} from '../view/Container';
import { CollectionImage } from '../view/Image';
import NotFound from './NotFound'
import { withTheme } from 'styled-components';
import PhotoCollections from '../../data/PhotoCollections';
import { getFullUrlForImage, getMetadataStringFromExif } from '../../util/PhotoActions';
import { SmallGrayTextButton } from '../view/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import exif from 'exifr';


function PhotosPage() {
  const params = useParams();
  const [pageNumber, setPageNumber] = useState(0);
  const [pages, setPages] = useState({});
  const [canScroll, setCanScroll] = useState(true);
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
    const handleScrollDelay = () => {
      setCanScroll(false);
      setTimeout(() => {
        setCanScroll(true);
      }, 500);
    };

    const handleScroll = (e) => {
      if (!canScroll) {
        return;
      }
      if (e.deltaY > 0) {
        safeSetPageNumber(pageNumber + 1);
        handleScrollDelay();
      } else if (e.deltaY < 0) {
        safeSetPageNumber(pageNumber - 1);
        handleScrollDelay();
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        safeSetPageNumber(pageNumber + 1);
      } else if (e.key === 'ArrowUp') {
        safeSetPageNumber(pageNumber - 1);
      }
    };
    const handleTouchStart = (e) => {
      const targetItem = e.target.tagName.toLowerCase();
      if (['a', 'button', 'img', 'svg'].includes(targetItem)) {
        return;
      }

      if (e.changedTouches[0].screenY < window.innerHeight / 2) {
        safeSetPageNumber(pageNumber - 1);
      } else {
        safeSetPageNumber(pageNumber + 1);
      }

      e.stopImmediatePropagation();
      e.preventDefault();
      return false;
    };

    window.addEventListener('wheel', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart)

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart)
    };
  }, [pageNumber, canScroll]);

  const setPageContents = (pageNumber, content) => {
    setPages((prevPages) => ({
      ...prevPages,
      [pageNumber]: content,
    }));
  };

  const fetchContent = async (pageNumber) => {
    if (pages[pageNumber] || pageNumber >= numPages) {
      return;
    }

    if (pageNumber === 0)
    {
      const content = (
        <CenteredContainer>
          <HeaderContainer margin="15px">
            <HeaderText>{collection.title}</HeaderText>
          </HeaderContainer>
          <HeaderContainer margin="75px">
            <GrayText>{collection.subtitle}</GrayText>
          </HeaderContainer>
          <GrayText>&#8595;</GrayText>
        </CenteredContainer>
      );
      setPageContents(pageNumber, content);
      return;
    }

    const imageName = collection.content[pageNumber - 1];
    const imageUrl = getFullUrlForImage(imageName, collection.imageFolder);
    const exifData = await exif.parse(imageUrl);
    const metadataText = getMetadataStringFromExif(exifData);
    const content = (
      <AbsoluteFlexContainer>
        <CollectionImage src={imageUrl} onClick={() => window.open(imageUrl)} />
        {metadataText ? <PhotoMetadataText>{metadataText}</PhotoMetadataText> : null}
      </AbsoluteFlexContainer>
    );
    setPageContents(pageNumber, content);
  }

  useEffect(() => {
    fetchContent(pageNumber);
    fetchContent(pageNumber + 1);
    fetchContent(pageNumber + 2);
    fetchContent(pageNumber + 3);
  }, [pageNumber]);

  let collection = null;
  if (params.collectionUrl in PhotoCollections) {
    collection = PhotoCollections[params.collectionUrl];
  } else {
    return <NotFound/>;
  }

  return (
    <PhotoCollectionsContainer>
      <PhotoTransitionStylesContainer>
        <TransitionGroup className="transition-group" component={null}>
          <CSSTransition
            key={pageNumber}
            timeout={{ enter: 400, exit: 200 }}
            classNames="photo-fade">
            <AbsoluteFlexContainer>
              {pages[pageNumber]}
            </AbsoluteFlexContainer>
          </CSSTransition>
        </TransitionGroup>
      </PhotoTransitionStylesContainer>
      <PhotoContentControlsContainer>
        <SmallGrayTextButton onClick={() => setPageNumber(0)}>
          <FontAwesomeIcon icon={faCaretUp} style={{marginTop: '2px'}}/>
        </SmallGrayTextButton>
        <SmallGrayText>{pageNumber + 1} of {numPages}</SmallGrayText>
        <SmallGrayTextButton onClick={() => setPageNumber(numPages - 1)}>
          <FontAwesomeIcon icon={faCaretDown} style={{marginBottom: '1px'}}/>
        </SmallGrayTextButton>
      </PhotoContentControlsContainer>
    </PhotoCollectionsContainer>
  );
}

export default withTheme(PhotosPage);
