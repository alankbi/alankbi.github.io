import React from 'react';
import Projects from '../../data/Projects';
import Item from '../view/Item';
import { HeaderText, NormalText } from '../view/Text';
import { CenteredContainer } from '../view/Container';


function Home() {
  return (
    <div className="home-page">

      <div style={{marginBottom: "100px"}}>
        <HeaderText>Hi, I'm Alan.</HeaderText>
        <NormalText style={{textAlign: "center"}}>This is the home page for my website.</NormalText>
      </div>

      <CenteredContainer>
        {Projects.map((project) => <Item project={project} />)}
      </CenteredContainer>
    </div>
  );
}

export default Home;
