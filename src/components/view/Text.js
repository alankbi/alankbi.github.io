import React from 'react';
import styled from 'styled-components'


export const HeaderText = styled.h1`
  color: ${ ({ theme: { colors } }) => colors.text };
  font-weight: bold;
  text-align: center;
  font-size: ${ ({ theme: { fontSizes } }) => fontSizes.header };
  text-decoration: underline;
  text-decoration-color: ${ ({ theme: { colors } }) => colors.current };
`;

export const NormalText = styled.p`
  color: ${ ({ theme: { colors } }) => colors.text };
  font-size: ${ ({ theme: { fontSizes } }) => fontSizes.normal };
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
`;

export const ItemDescriptionText = styled.p`
  color: ${ ({ theme: { colors } }) => colors.white };
  text-align: center;
  font-size: ${ ({ theme: { fontSizes } }) => fontSizes.itemdesc };
`;
