import React from 'react';
import { CenteredContainer, HeaderContainer, LeftAlignedContainer } from '../view/Container';
import { HeaderText, NormalText, TitleText } from '../view/Text';
import { Column, Row } from '../view/Grid';
import { SquareImage } from '../view/Image';
import { UnderlinedLink, UnstyledLink } from '../view/Link';
import Social from '../view/Social';
import styled from 'styled-components';

const SocialButtons = styled.div`
  ${UnstyledLink} {
    margin: 4px 6px;
    font-size: ${ ({ theme: { fontSizes }}) => fontSizes.large };
  }
`;

function About() {
  return (
    <div className="about-page">
      <HeaderContainer margin={'40px'}>
        <HeaderText>Hi, I'm Alan.</HeaderText>
      </HeaderContainer>

      <CenteredContainer>
        <Row>
          <Column>
            <SquareImage src={"/assets/images/about.jpg"} alt={"A picture of me"} />
          </Column>

          <Column style={{padding: "0px 40px"}}>
            <LeftAlignedContainer>
              <TitleText>About Me</TitleText>
              <NormalText>Hello! I’m a sophomore at Duke University studying computer science and mathematics.
                My passion for tech ranges from <UnderlinedLink to={"/projects/statsify"}>web dev</UnderlinedLink> to&nbsp;
                <UnderlinedLink to={"/projects/detecto"}>machine learning</UnderlinedLink> to&nbsp;
                <UnderlinedLink to={"/projects/hackduke"}>social good.</UnderlinedLink>
              </NormalText>

              <NormalText>Over the past few summers, I interned at <UnderlinedLink to={"/"}>Fidelity</UnderlinedLink> ('20),{' '} 
                <UnderlinedLink to={"/projects/expedia"}>Expedia</UnderlinedLink> ('18),
                and <UnderlinedLink to={"/projects/uw-2019"}>UW CSE</UnderlinedLink> ('19, '17) doing software development
                and CS research. In my free time, I enjoy playing table tennis and watching random clips
                on YouTube.
              </NormalText>

              <TitleText>Contact</TitleText>
              <SocialButtons><Social/></SocialButtons>
            </LeftAlignedContainer>
          </Column>
        </Row>
      </CenteredContainer>
    </div>
  );
}

export default About;
