import React from 'react';
import { Link } from 'react-router-dom';
import { UnstyledLink } from './Link';
import { PhotoItemHoverText, PhotoItemSubtitleHoverText } from './Text';
import { PhotoItemContainer, PhotoItemDescription } from './Container'
import PhotoCollections from '../../data/PhotoCollections';
import { getFullUrlForHeaderImage } from '../../util/PhotoActions';


function PhotoItem(props) {
  const collection = PhotoCollections[props.collectionUrl];
  const linkPath = '/photos/' + props.collectionUrl;
  const firstImage = collection.content[0];
  const headerImagePath = getFullUrlForHeaderImage(firstImage, collection.imageFolder);
  return (
    <UnstyledLink as={Link} to={linkPath}>
      <PhotoItemContainer image={headerImagePath}>
        <PhotoItemDescription>
          <PhotoItemHoverText>{collection.title}</PhotoItemHoverText>
          <PhotoItemSubtitleHoverText>{collection.subtitle}</PhotoItemSubtitleHoverText>
        </PhotoItemDescription>
      </PhotoItemContainer>
    </UnstyledLink>
  );
}

export default PhotoItem;
