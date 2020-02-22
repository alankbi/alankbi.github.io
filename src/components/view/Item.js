import React from 'react';
import { ProjectLink } from './Link';
import { ItemTitleText, ItemDescriptionText } from '../view/Text';
import { ItemContainer, ItemBottomTitle, ItemDescription } from '../view/Container'


function Item(props) {
  const project = props.project;
  return (
    <ProjectLink href={project.link}>
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
