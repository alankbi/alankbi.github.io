import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';

export const NavbarLink = styled(Link)`
  color: ${ ({ theme: { colors } }) => colors.text };
  width: 150px;
  font-weight: light;
  text-decoration: none;
`;

export const ProjectLink = styled(Link)`
  text-decoration: none;
`;

export const UnderlinedLink = styled.a`
  position: relative;
  color: ${ ({ theme: { colors } }) => colors.text };
  
  &:after {
    content: "";
    position: absolute;
    left: 0%;
    bottom: -8px;
    height: 0px;
    width: 100%;
    border-bottom: 5px solid ${ ({ theme: { colors } }) => colors.current };
    transition: 0.3s all;
  }
  
  &:hover:after {
    left: 50%;
    width: 0%;
    transition: 0.3s all;
  }
`;

export const UnstyledLink = styled.a`
  text-decoration: none;
  color: ${ ({ color, theme: { colors } }) => color ? color : colors.text };
`;
