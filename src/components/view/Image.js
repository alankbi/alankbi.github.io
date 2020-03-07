import React from 'react';
import styled from 'styled-components'


export const ProjectImage = styled.img`
  width: 100%;
  border: 1px solid #eee;
  box-shadow: ${ ({ theme: { gradients } }) => gradients.itemshadow };
`;
