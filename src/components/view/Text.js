import React from 'react';
import styled from 'styled-components'


export const HeaderText = styled.h1`
  display: inline-block;
  margin: 0;
  color: ${ ({ theme: { colors } }) => colors.text };
  font-weight: bold;
  text-align: center;
  font-size: ${ ({ theme: { fontSizes } }) => fontSizes.header };
`;

export const NormalText = styled.p`
  color: ${ ({ theme: { colors } }) => colors.text };
  font-size: ${ ({ theme: { fontSizes } }) => fontSizes.normal };
  line-height: 1.5;
`;

export const GrayText = styled.p`
  color: ${ ({ theme: { colors } }) => colors.gray };
  font-size: ${ ({ theme: { fontSizes } }) => fontSizes.small };
`;

export const ItemTitleText = styled.p`
  color: ${ ({ theme: { colors } }) => colors.text };
  text-align: center;
  font-size: ${ ({ theme: { fontSizes } }) => fontSizes.itemtitle };
  font-weight: bold;
  
  @media (max-width: 500px) {
    font-size: ${ ({ theme: { fontSizes } }) => fontSizes.itemtitlemobile };
  }
`;

export const ItemDescriptionText = styled.p`
  color: ${ ({ theme: { colors } }) => colors.white };
  text-align: center;
  font-size: ${ ({ theme: { fontSizes } }) => fontSizes.itemdesc };
`;

export const TitleText = styled.h2`
  color: ${ ({ theme: { colors } }) => colors.text };
  font-size: ${ ({ theme: { fontSizes } }) => fontSizes.title };
  font-weight: bold;
`;
