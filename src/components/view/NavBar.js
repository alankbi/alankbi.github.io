import React from 'react';
import styled from 'styled-components'
import { HeaderLink } from './Link';

const Absolute = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  padding: 10px;
  background: red;
  text-align: center;
`;

const LeftHeader = styled(HeaderLink)`
  float: left;
`;

const RightHeader = styled(HeaderLink)`
  float: right;
`;

const CenterHeader = styled(HeaderLink)`
  display: inline-block;
  margin: 0 auto;
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
          Alan Bi
        </CenterHeader>
      </nav>
      <div style={{clear: "both"}}>

      </div>
    </Absolute>
  );
}

export default NavBar;
