import React from 'react';
import styled from 'styled-components'


export const ProjectImage = styled.img`
  width: 100%;
  box-shadow: ${ ({ theme: { gradients } }) => gradients.itemshadow };
`;
