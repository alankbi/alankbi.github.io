import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderText, NormalText } from '../view/Text';

function Home() {
  return (
    <div className="home-page">
      <HeaderText>Hi, I'm Alan.</HeaderText>
      <NormalText>This is the home page for my website.</NormalText>

    </div>
  );
}

export default Home;
