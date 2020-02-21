import React from 'react';
import styled from 'styled-components'
import { NavbarLink } from './Link';

const Absolute = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  padding: 10px;
  text-align: center;
`;

const LeftHeader = styled(NavbarLink)`
  float: left;
  font-size: ${ ({ theme: { fontSizes } }) => fontSizes.navbar };
`;

const RightHeader = styled(NavbarLink)`
  float: right;
  font-size: ${ ({ theme: { fontSizes } }) => fontSizes.navbar };
`;

const CenterHeader = styled(NavbarLink)`
  display: inline-block;
  margin: 0 auto;
  font-weight: 700;
  font-size: ${ ({ theme: { fontSizes } }) => fontSizes.navbartitle };
`;

function NavBar() {
  return (
    <Absolute className="navbar">
      <nav>
        <LeftHeader to="/blog">
          Blog
        </LeftHeader>
        <RightHeader to="/about">
          About
        </RightHeader>
        <CenterHeader to="/">
          ALAN BI
        </CenterHeader>
      </nav>
      <div style={{clear: "both"}}>

      </div>
    </Absolute>
  );
}

export default NavBar;
