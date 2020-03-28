import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';


export const UnderlinedLink = styled(Link)`
  display: inline-block;
  position: relative;
  text-decoration: none;
  color: ${ ({ theme: { colors } }) => colors.text };
  
  &:after {
    content: "";
    position: absolute;
    left: 0%;
    bottom: 0px;
    height: 0px;
    width: 100%;
    border-bottom: 3px solid ${ ({ theme: { colors } }) => colors.current };
    transition: 0.3s all;
  }
  
  &:hover:after {
    left: 50%;
    width: 0%;
    transition: 0.3s all;
  }
`;

export const UnderlinedExternalLink = styled(UnderlinedLink).attrs({ as: 'a'})`
  
`;


export const NavbarLink = styled(UnderlinedLink)`
  color: ${ ({ theme: { colors } }) => colors.text };
  font-weight: light;
  text-decoration: none;
  
  ${ ({ active, theme: { colors } }) => active ? 
    '&:after {\n    bottom: -4px;\n    border-bottom: 3px solid ' + colors.current + ';\n  }' :
    '&:after {\n    left: 50%;\n    width: 0%;\n    bottom: -4px;\n    border-bottom: 3px solid ' + 
    colors.current + ';\n  }\n\n  &:hover:after {\n    left: 0%;\n    width: 100%;\n  }'
  }
`;

export const ProjectLink = styled(UnderlinedLink).attrs({ as: 'a'})`
  &:after {
    bottom: 0px;
    border-bottom: 5px solid ${ ({ theme: { colors } }) => colors.current };
  }
`;

export const UnstyledLink = styled.a`
  text-decoration: none;
  color: ${ ({ color, theme: { colors } }) => color ? color : colors.text };
`;
