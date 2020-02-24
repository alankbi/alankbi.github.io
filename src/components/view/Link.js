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
  color: ${ ({ theme: { colors } }) => colors.text };
`;

export const UnstyledLink = styled.a`
  text-decoration: none;
  color: ${ ({ color, theme: { colors } }) => color ? color : colors.text };
`;
