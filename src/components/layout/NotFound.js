import React from 'react';
import { HeaderText, NormalText } from '../view/Text';
import { withTheme } from 'styled-components'


function Home(props) {
  return (
    <div className="not-found-page">
      <HeaderText color={props.theme.colors.current}>Page not found</HeaderText>
      <NormalText style={{textAlign: "center"}}>Page not found :(</NormalText>
    </div>
  );
}

export default withTheme(Home);
