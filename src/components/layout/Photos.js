import React from 'react';
import { HeaderText } from '../view/Text';
import { HeaderContainer, CenteredContainer, BasePageContainer } from '../view/Container';
import { withTheme } from 'styled-components'
import PhotoItem from '../view/PhotoItem';
import PhotoCollections from '../../data/PhotoCollections';


function Photos(props) {
  return (
    <BasePageContainer className="photo-page">
      <HeaderContainer>
        <HeaderText color={props.theme.colors.current}>Photo Collections</HeaderText>
      </HeaderContainer>

      <CenteredContainer>
        {Object.keys(PhotoCollections).map((collectionUrl) => <PhotoItem key={collectionUrl} collectionUrl={collectionUrl} />)}
      </CenteredContainer>
    </BasePageContainer>
  );
}

export default withTheme(Photos);
