import styled from 'styled-components';

export const SmallGrayTextButton = styled.button`
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
  color: ${ ({ theme: { colors } }) => colors.gray };
  font-size: ${ ({ theme: { fontSizes }}) => fontSizes.small };
`;