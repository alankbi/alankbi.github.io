import React from 'react';
import styled from 'styled-components'


export const HeaderText = styled.h1`
  color: ${ ({ theme: { colors } }) => colors.text };
  font-weight: bold;
  text-align: center;
  font-size: ${ ({ theme: { fontSizes } }) => fontSizes.header };
`;

export const NormalText = styled.p`
  color: ${ ({ theme: { colors } }) => colors.text };
  text-align: center;
  font-size: ${ ({ theme: { fontSizes } }) => fontSizes.normal };
`;
