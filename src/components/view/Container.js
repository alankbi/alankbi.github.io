import React from 'react';
import styled from 'styled-components'

export const CenteredContainer = styled.div`
  text-align: center;
`;

export const ItemContainer = styled.div`
  width: 400px;
  height: 400px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(32,43,54,0.12);
  background-image: url(${ ({ image }) => image });
  background-position: center;
  background-size: 100%;
  background-color: ${ ({ color }) => color };
  padding: 10px;
  margin: 20px;
  border-radius: 2px;
  display: inline-block;
  position: relative;
  
  &:hover {
    // filter: brightness(50%);
    opacity: 0.5;
  }
`;

export const ItemBottomTitle = styled.div`
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  text-align: center;
`;

export const ItemDescription = styled.div`
  position: absolute;
  bottom: 30px;
  left: 10px;
  right: 10px;
  top: 0;
  bottom: 40px;
  margin: auto;
  height: 100px;
  text-align: center;
`;