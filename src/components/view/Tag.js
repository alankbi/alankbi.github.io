import React from 'react';
import styled from 'styled-components'


export const StyledTag = styled.div`
  display: inline-block;
  margin: 3px;
  padding: 2px 10px 5px 10px;
  border-radius: 20px;
  background: ${ ({ theme: { colors } }) => colors.current };
  color: ${ ({ theme: { colors } }) => colors.white };
  
  & p {
    margin: 0;
  }
`;

function Tag(props) {
  return (
    <StyledTag className="tag-item">
      <p>{props.tag}</p>
    </StyledTag>
  );
}

export default Tag;
