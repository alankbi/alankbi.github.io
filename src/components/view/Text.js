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
  font-size: ${ ({ theme: { fontSizes } }) => fontSizes.normal };
`;

export const ItemTitleText = styled.p`
  color: white;
  text-align: center;
  font-size: ${ ({ theme: { fontSizes } }) => fontSizes.itemtitle };
  font-weight: bold;
`;

export const ItemDescriptionText = styled.p`
  color: white;
  text-align: center;
  font-size: ${ ({ theme: { fontSizes } }) => fontSizes.itemdesc };
`;
