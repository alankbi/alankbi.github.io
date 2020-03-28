import React from 'react';
import styled from 'styled-components'


export const SquareImage = styled.img`
  width: 100%;
  box-shadow: ${ ({ theme: { gradients } }) => gradients.itemshadow };
  margin-bottom: 30px;
  
  @media (max-width: 1000px) and (min-width: 700px) {
    width: 50%;
  }
  
  @media (max-width: 699px) {
    width: 70%;
  }
`;

export const BlogImage = styled.img`
  margin: 40px auto;
  display: block;
  width: 90%;
  box-shadow: ${ ({ theme: { gradients } }) => gradients.itemshadow };
  
  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const BlogItemImage = styled.img`
  width: 100%;
  display: block;
`;