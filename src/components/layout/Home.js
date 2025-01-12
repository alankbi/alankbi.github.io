import React from 'react';
import Projects from '../../data/Projects';
import Item from '../view/Item';
import { HeaderText, NormalText } from '../view/Text';
import { HeaderContainer, CenteredContainer, BasePageContainer } from '../view/Container';
import { withTheme } from 'styled-components'


function Home(props) {
  return (
    <BasePageContainer className="home-page">

      <HeaderContainer>
        <HeaderText color={props.theme.colors.current}>Hi, I'm Alan.</HeaderText>
        <NormalText>I'm a software engineer living in Chicago, previously in Durham and Seattle.</NormalText>
      </HeaderContainer>

      <CenteredContainer>
        {Object.keys(Projects).map((project) => <Item key={project} project={project} />)}
      </CenteredContainer>
    </BasePageContainer>
  );
}

export default withTheme(Home);
