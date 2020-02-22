import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';

export const NavbarLink = styled(Link)`
  color: ${ ({ theme: { colors } }) => colors.text };
  width: 150px;
  font-weight: light;
  text-decoration: none;
`;

export const ProjectLink = styled.a`
  text-decoration: none;
`;
