import React from 'react';
import Projects from '../../data/Projects';
import Item from '../view/Item';
import { HeaderText, NormalText } from '../view/Text';
import { CenteredContainer } from '../view/Container';
import { withTheme } from 'styled-components'


function Home(props) {
  return (
    <div className="home-page">

      <CenteredContainer style={{marginBottom: "100px"}}>
        <HeaderText color={props.theme.colors.current}>Hi, I'm Alan.</HeaderText>
        <NormalText>This is the home page for my website.</NormalText>
      </CenteredContainer>

      <CenteredContainer>
        {Object.keys(Projects).map((project) => <Item project={project} />)}
      </CenteredContainer>
    </div>
  );
}

export default withTheme(Home);
