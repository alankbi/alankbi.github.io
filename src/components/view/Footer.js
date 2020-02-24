import React from 'react';
import styled from 'styled-components'
import { GrayText } from './Text';
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
`;

const ColorButton = styled.button`
  cursor: pointer;
  border: none;
  background: ${ ({ theme: { colors } }) => colors.current };
  box-shadow: ${ ({ theme: { gradients } }) => gradients.colorshadow };
  width: 20px;
  height: 20px;
  border-radius: 10px;
  
  &:focus {
    outline:0;
  }
`;

const ColorChangeText = styled(GrayText)`
  display: inline;
  margin-right: 8px;
  margin-left: 10px;
`;

const SocialFooter = styled.div`
  position: absolute;
  right: 20px;
  ${UnstyledLink} {
    margin: 4px;
    font-size: ${ ({ theme: { fontSizes }}) => fontSizes.normal };
  }
`;

function NavBar(props) {
  return (
    <BottomPosition className="footer">
      <ColorChangeText>Theme: </ColorChangeText>
      <ColorButton onClick={props.colorChange} />

      <SocialFooter><Social/></SocialFooter>
    </BottomPosition>
  );
}

export default NavBar;
