import styled from 'styled-components'


export const HeaderText = styled.h1`
  display: inline-block;
  margin: 0;
  color: ${ ({ theme: { colors } }) => colors.text };
  font-weight: bold;
  text-align: center;
  font-size: ${ ({ theme: { fontSizes } }) => fontSizes.header };
  
  @media (max-width: 500px) {
    font-size: ${ ({ theme: { fontSizes } }) => fontSizes.headermobile };
  }
`;

export const NormalText = styled.p`
  color: ${ ({ theme: { colors } }) => colors.text };
  font-size: ${ ({ theme: { fontSizes } }) => fontSizes.normal };
  line-height: 1.5;
`;

export const SmallText = styled.p`
  color: ${ ({ theme: { colors } }) => colors.text };
  font-size: ${ ({ theme: { fontSizes } }) => fontSizes.small };
  line-height: 1.5;
`;

export const NormalTextInline = styled(NormalText)`
  display: inline;
`;

export const GrayText = styled.p`
  margin: 0;
  color: ${ ({ theme: { colors } }) => colors.gray };
  font-size: ${ ({ theme: { fontSizes } }) => fontSizes.normal };
`;

export const SmallGrayText = styled(GrayText)`
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

export const PhotoItemHoverText = styled.p`
  color: ${ ({ theme: { colors } }) => colors.white };
  text-align: center;
  justify-content: center;
  font-weight: bold;
  font-size: ${ ({ theme: { fontSizes } }) => fontSizes.header };
  
  @media (max-width: 900px) and (min-width: 600px) {
    font-size: ${ ({ theme: { fontSizes } }) => fontSizes.headermobile };
  }
  
  @media (max-width: 599px) {
    font-size: ${ ({ theme: { fontSizes } }) => fontSizes.itemtitlemobile };
  }
`;

export const TitleText = styled.h2`
  color: ${ ({ theme: { colors } }) => colors.text };
  font-size: ${ ({ theme: { fontSizes } }) => fontSizes.title };
  font-weight: bold;
`;

export const BlogItemTitleText = styled.h2`
  color: ${ ({ theme: { colors } }) => colors.text };
  font-size: ${ ({ theme: { fontSizes } }) => fontSizes.title };
  font-weight: normal;
`;

export const BlogPostTitleText = styled.h2`
  margin-top: 40px;
  
  p {
    color: ${ ({ theme: { colors } }) => colors.text };
    font-size: ${ ({ theme: { fontSizes } }) => fontSizes.title };
    font-weight: bold;
  }
`;

export const PhotographyText = styled(NormalText)`
  margin: 0 auto;
  text-align: center;
  width: 75%;
  line-height: 1.4;
`;