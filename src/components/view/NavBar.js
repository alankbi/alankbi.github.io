import React from 'react';
import styled from 'styled-components'
import { NavbarLink } from './Link';
import { withRouter } from 'react-router-dom';


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
  margin-left: 50px;
  font-size: ${ ({ theme: { fontSizes } }) => fontSizes.navbar };
`;

const RightHeader = styled(NavbarLink)`
  float: right;
  margin-right: 50px;
  font-size: ${ ({ theme: { fontSizes } }) => fontSizes.navbar };
`;

const CenterHeader = styled(NavbarLink)`
  display: inline-block;
  margin: 0 auto;
  font-weight: 700;
  font-size: ${ ({ theme: { fontSizes } }) => fontSizes.navbartitle };
`;

const NavBar = withRouter(function (props) {
  const url = props.location.pathname;

  return (
    <Absolute className="navbar">
      <nav>
        <LeftHeader to="/blog" active={url.startsWith("/blog") ? 1 : undefined}>
          Blog
        </LeftHeader>
        <RightHeader to="/about" active={url.startsWith("/about") ? 1 : undefined}>
          About
        </RightHeader>
        <CenterHeader to="/" active={url === "/" ? 1 : undefined}>
          ALAN BI
        </CenterHeader>
      </nav>
      <div style={{clear: "both"}}>

      </div>
    </Absolute>
  );
});

export default NavBar;
