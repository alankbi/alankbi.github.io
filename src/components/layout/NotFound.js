import React from 'react';
import { HeaderText, NormalText } from '../view/Text';
import { withTheme } from 'styled-components'
import { CenteredContainer } from '../view/Container';
import { UnderlinedLink } from '../view/Link';


function Home() {
  return (
    <CenteredContainer className="not-found-page">
      <HeaderText>Page not found</HeaderText>
      <NormalText>Click <UnderlinedLink to={'/'}>here</UnderlinedLink> to return home.</NormalText>
    </CenteredContainer>
  );
}

export default withTheme(Home);
