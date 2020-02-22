import React from 'react';
import styled from 'styled-components'

export const CenteredContainer = styled.div`
  text-align: center;
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
  display: none;
`;

export const ItemContainer = styled.div`
  width: 400px;
  height: 400px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(32,43,54,0.08);
  background-image: url(${ ({ image }) => image });
  background-position: center;
  background-size: 100%;
  background-color: ${ ({ color }) => color };
  padding: 10px;
  margin: 10px;
  border-radius: 0px;
  display: inline-block;
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    width: 100%; 
    height: 100%;
    top: 0; 
    left: 0;
    background: black;
    opacity: 0;
    z-index: 1;
  }

  &:hover::after {
    content: "";
    opacity: 0.4;
    z-index: 1;
    
    transition: 0.3s all;
  }
  
  &:hover ${ItemDescription} {
    display: inline;
    z-index: 2;
  }
  
  &:hover ${ItemBottomTitle} {
    z-index: 2;
  }
`;
