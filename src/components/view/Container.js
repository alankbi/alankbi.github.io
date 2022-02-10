import styled from 'styled-components'


export const CenteredContainer = styled.div`
  text-align: center;
`;

export const HeaderContainer = styled(CenteredContainer)`
  margin-bottom: ${({ margin }) => margin ? margin : '100px'};
`;

export const LeftAlignedContainer = styled.div`
  text-align: left;
`;

export const ItemBottomTitle = styled.div`
  position: absolute;
  bottom: 25px;
  left: 0;
  right: 0;
  text-align: center;
`;

export const ItemDescription = styled.div`
  position: absolute;
  left: 10px;
  right: 10px;
  top: 0;
  bottom: 40px;
  margin: auto;
  height: 100px;
  text-align: center;
  display: none;
`;

export const ItemContainer = styled.div`
  width: 300px;
  height: 300px;
  text-align: center;
  box-shadow: ${ ({ theme: { gradients } }) => gradients.itemshadow };
  background-image: url(${ ({ image }) => image });
  background-position: 50% 25%;
  background-size: 50%;
  background-repeat: no-repeat;
  background-color: ${ ({ theme: { colors } }) => colors.white };
  padding: 10px;
  margin: 15px;
  border-radius: 0;
  display: inline-block;
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    width: 100%; 
    height: 100%;
    top: 0; 
    left: 0;
    background: ${ ({ theme: { colors } }) => colors.current };
    border-radius: 0;
    opacity: 0;
    z-index: 1;
    
    transition: 0.3s all;
  }

  &:hover::after {
    content: "";
    opacity: 0.9;
    z-index: 1;
    
    transition: 0.3s all;
  }
  
  &:hover ${ItemDescription} {
    display: inline;
    z-index: 2;
  }
  
  &:hover ${ItemBottomTitle} {
    z-index: 0;
  }
  
  @media (max-width: 500px) {
    width: 250px;
    height: 250px;
  }
`;

export const BlogItemTextContainer = styled.div`
  min-height: 120px;
  padding: 10px 10px;
  position: relative;
`;

export const BlogItemContainer = styled.div`
  width: 300px;
  text-align: center;
  box-shadow: ${ ({ theme: { gradients } }) => gradients.itemshadow };
  background-color: ${ ({ theme: { colors } }) => colors.white };
  margin: 15px;
  border-radius: 0;
  display: inline-block;
  vertical-align: top;
  position: relative;
  
  &:hover {
    box-shadow: ${ ({ theme: { gradients } }) => gradients.itemshadowhover } };
    transition: 0.3s box-shadow;
  }
  
  ${BlogItemTextContainer}::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 0;
    width: 100%;
    border-bottom: 3px solid ${ ({ theme: { colors } }) => colors.current };
    transition: 0.3s all;
  }
  
  &:hover {
    ${BlogItemTextContainer}::after {
      left: 50%;
      width: 0;
      transition: 0.3s all;
    }
  }
  
  @media (max-width: 500px) {
    width: 250px;
  }
`;

export const BlogPageContainer = styled.div`
  margin: 0 auto;
  width: 75%;
`;
