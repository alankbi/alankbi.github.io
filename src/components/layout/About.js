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
              <NormalText>Hello! I’m a junior at Duke University studying computer science and statistics.
                My passion for tech ranges from <UnderlinedLink to={"/projects/codejoust"}>web dev</UnderlinedLink> to&nbsp;
                <UnderlinedLink to={"/projects/detecto"}>machine learning</UnderlinedLink> to&nbsp;
                <UnderlinedLink to={"/projects/hackduke"}>social good.</UnderlinedLink>
              </NormalText>

              <NormalText>Over the past few summers, I interned at{' '}
                <UnderlinedLink to={"/projects/microsoft"}>Microsoft</UnderlinedLink> ('21),{' '}
                <UnderlinedLink to={"/projects/fidelity"}>Fidelity</UnderlinedLink> ('20),
                and <UnderlinedLink to={"/projects/uw-cse"}>UW CSE</UnderlinedLink> ('19) doing software development
                and CS research. In my free time, I enjoy playing table tennis, watching sports, and hanging out with
                friends.
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
