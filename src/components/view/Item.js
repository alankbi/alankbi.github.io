import React from 'react';
import { ProjectLink } from './Link';
import Projects from '../../data/Projects'
import { ItemTitleText, ItemDescriptionText } from '../view/Text';
import { ItemContainer, ItemBottomTitle, ItemDescription } from '../view/Container'


function Item(props) {
  const project = Projects[props.project];
  return (
    <ProjectLink to={"/project/" + props.project}>
      <ItemContainer image={project.image} color={project.color}>
        <ItemDescription>
          <ItemDescriptionText>{project.description}</ItemDescriptionText>
        </ItemDescription>

        <ItemBottomTitle>
          <ItemTitleText>{project.title}</ItemTitleText>
        </ItemBottomTitle>
      </ItemContainer>
    </ProjectLink>
  );
}

export default Item;
