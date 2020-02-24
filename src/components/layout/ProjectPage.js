import React from 'react';
import { HeaderText, NormalText } from '../view/Text';
import { UnderlinedLink } from '../view/Link';
import { CenteredContainer } from '../view/Container';
import Projects from '../../data/Projects';
import NotFound from './NotFound'
import { withTheme} from 'styled-components';
import { useParams } from 'react-router-dom';

function ProjectPage(props) {
  const params = useParams();
  let project = null;
  if (params.project in Projects) {
    project = Projects[params.project];
  } else {
    return <NotFound/>;
  }

  return (
    <div className="project-page">
      <div>
        <UnderlinedLink href={project.link}>
          <HeaderText color={props.theme.colors.blue}>{project.title}</HeaderText>
        </UnderlinedLink>
        <NormalText style={{textAlign: "center"}}>{project.description}</NormalText>
      </div>
      <CenteredContainer>
        <UnderlinedLink href={project.link}>
          <NormalText>Click here to learn more.</NormalText>
          </UnderlinedLink>
      </CenteredContainer>
    </div>
  );
}

export default withTheme(ProjectPage);
