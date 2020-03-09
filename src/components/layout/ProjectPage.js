import React from 'react';
import {HeaderText, NormalText, ProjectInfoTitleText} from '../view/Text';
import { ProjectLink } from '../view/Link';
import {CenteredContainer, LeftAlignedContainer} from '../view/Container';
import { Row, Column } from '../view/Grid';
import { ProjectImage } from '../view/Image';
import Projects from '../../data/Projects';
import NotFound from './NotFound'
import { withTheme} from 'styled-components';
import { useParams } from 'react-router-dom';
import Tag from '../view/Tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

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
      <CenteredContainer>
        <ProjectLink href={project.link} target={'_blank'}>
          <HeaderText color={props.theme.colors.current}>{project.title}</HeaderText>
        </ProjectLink>
        <FontAwesomeIcon icon={ faLink } style={{verticalAlign: 'super', marginLeft: '10px'}}/>
      </CenteredContainer>

      <CenteredContainer>
        <Row style={{marginTop: '20px'}}>
          <Column>
            <ProjectImage src={project.image} alt={project.title} />
          </Column>

          <Column style={{padding: '0px 40px'}}>
            <LeftAlignedContainer className="project-info">
              <ProjectInfoTitleText>Description</ProjectInfoTitleText>
              <NormalText>{project.longdescription}</NormalText>

              <ProjectInfoTitleText>Tags</ProjectInfoTitleText>
              {project.tags.map((tag) => <Tag key={tag} tag={tag}/>)}
            </LeftAlignedContainer>
          </Column>
        </Row>
      </CenteredContainer>
    </div>
  );
}

export default withTheme(ProjectPage);
