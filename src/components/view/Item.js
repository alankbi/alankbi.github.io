import React from 'react';
import { UnstyledLink } from './Link';
import Projects from '../../data/Projects'
import { ItemTitleText, ItemDescriptionText } from '../view/Text';
import { ItemContainer, ItemBottomTitle, ItemDescription } from '../view/Container'
import { Link } from 'react-router-dom';


function Item(props) {
  const project = Projects[props.project];
  return (
    <UnstyledLink as={Link} to={"/project/" + props.project}>
      <ItemContainer image={project.image}>
        <ItemDescription>
          <ItemDescriptionText>{project.description}</ItemDescriptionText>
        </ItemDescription>

        <ItemBottomTitle>
          <ItemTitleText>{project.title}</ItemTitleText>
        </ItemBottomTitle>
      </ItemContainer>
    </UnstyledLink>
  );
}

export default Item;
