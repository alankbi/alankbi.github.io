import React from 'react';
import { BasePageContainer, CenteredContainer, HeaderContainer, LeftAlignedContainer } from '../view/Container';
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
    <BasePageContainer className="about-page">
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
              <NormalText>I’m a Duke University '23 alum who studied computer science and statistics.
                My passion for tech ranges from <UnderlinedLink to={"/projects/codejoust"}>web dev</UnderlinedLink> to&nbsp;
                <UnderlinedLink to={"/projects/detecto"}>machine learning</UnderlinedLink> to&nbsp;
                <UnderlinedLink to={"/projects/hackduke"}>social good.</UnderlinedLink>
              </NormalText>

              <NormalText>Currently, I am a software engineer at{' '}
                <UnderlinedLink to={"/projects/optiver"}>Optiver</UnderlinedLink> living in Chicago. In my free
                time, I enjoy playing ping pong, watching sports, taking photos, and hanging out with friends.
              </NormalText>

              <TitleText>Contact</TitleText>
              <SocialButtons><Social/></SocialButtons>
            </LeftAlignedContainer>
          </Column>
        </Row>
      </CenteredContainer>
    </BasePageContainer>
  );
}

export default About;
