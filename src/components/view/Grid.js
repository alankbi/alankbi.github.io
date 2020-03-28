import React from 'react';
import styled from 'styled-components'


export const Row = styled.div`
  display: flex;
  
  @media (max-width: 1000px) {
    display: inline-block;
  }
`;

export const Column = styled.div`
  flex: 50%;
  margin: 12px;
`;