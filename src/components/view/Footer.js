import React from 'react';
import styled from 'styled-components'
import Social from './Social';
import { UnstyledLink } from './Link';

const BottomPosition = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  left: 0;
  right: 0;
  bottom: 0;
  height: 30px;
  padding: 5px;

  @media (max-width: 600px) {
    position: relative;
    box-sizing: border-box;
    flex-shrink: 0;
    justify-content: space-between;
    height: auto;
    padding: 12px 5% calc(12px + env(safe-area-inset-bottom, 0px));
  }
`;

const ColorButton = styled.button`
  cursor: pointer;
  border: none;
  background: ${ ({ theme: { colors } }) => colors.current };
  box-shadow: ${ ({ theme: { gradients } }) => gradients.colorshadow };
  width: 20px;
  height: 20px;
  border-radius: 10px;
  
  margin-left: 10px;

  @media (max-width: 600px) { margin-left: 0; }
  
  &:focus {
    outline:0;
  }
`;

const SocialFooter = styled.div`
  position: absolute;
  right: 20px;
  bottom: 10px;
  
  ${UnstyledLink} {
    margin: 4px;
    font-size: ${ ({ theme: { fontSizes }}) => fontSizes.normal };

  }
  
  @media (max-width: 600px) {
    position: static;
    > div { display: flex; align-items: center; gap: 4px; }
    ${UnstyledLink} {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      margin: 0;
      font-size: 18px;
    }
  }
`;

function NavBar(props) {
  return (
    <BottomPosition className="footer">
      <ColorButton onClick={props.colorChange} />

      <SocialFooter><Social/></SocialFooter>
    </BottomPosition>
  );
}

export default NavBar;
