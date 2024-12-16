import styled from 'styled-components'


export const BasePageContainer = styled.div`
  margin-top: 80px;
  padding-bottom: 100px;
`;

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

export const PhotoItemDescription = styled.div`
  position: absolute;
  left: 10px;
  right: 10px;
  top: 0;
  bottom: 3%;
  margin: auto;
  height: 100px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  opacity: 0;
`;

const BaseItemContainer = styled.div`
  text-align: center;
  box-shadow: ${ ({ theme: { gradients } }) => gradients.itemshadow };
  background-image: url(${ ({ image }) => image });
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
`;

export const ItemContainer = styled(BaseItemContainer)`
  width: 300px;
  height: 300px;
  background-position: 50% 25%;
  background-size: 50%;

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

export const PhotoItemContainer = styled(BaseItemContainer)`
  width: 800px;
  height: 640px;
  background-position: 50% 25%;
  background-size: 100%;
  padding: 0;

  &:hover ${PhotoItemDescription} {
    opacity: 1;
    z-index: 2;
    transition: 0.3s all;
  }
  
  @media (max-width: 1200px) and (min-width: 900px) {
    width: 600px;
    height: 480px;
  }
  
  @media (max-width: 899px) and (min-width: 750px) {
    width: 450px;
    height: 360px;
  }
  
  @media (max-width: 749px) and (min-width: 600px) {
    width: 350px;
    height: 280px;
  }
  
  @media (max-width: 599px) {
    width: 250px;
    height: 200px;
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
  margin: 80px auto;
  width: 75%;
  padding-bottom: 100px;
`;

export const PhotoCollectionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export const PhotoContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //max-width: 80%;
  //max-height: 50%;
  text-align: center;
  flex-grow: 1;
`;

export const PhotoContentControlsContainer = styled.div`
  position: fixed;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  text-align: center;
  z-index: 10;
  background: ${ ({ theme: { colors } }) => colors.background };
  border-radius: 4px;
  padding: 4px;
`
