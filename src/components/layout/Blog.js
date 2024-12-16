import React from 'react';
import { HeaderText } from '../view/Text';
import { HeaderContainer, CenteredContainer, BasePageContainer } from '../view/Container';
import { withTheme } from 'styled-components'
import BlogPosts from '../../data/BlogPosts';
import BlogItem from '../view/BlogItem';


function Blog(props) {
  return (
    <BasePageContainer className="blog-page">
      <HeaderContainer>
        <HeaderText color={props.theme.colors.current}>Blog</HeaderText>
      </HeaderContainer>

      <CenteredContainer>
        {Object.keys(BlogPosts).map((blog) => <BlogItem key={blog} blog={blog} />)}
      </CenteredContainer>
    </BasePageContainer>
  );
}

export default withTheme(Blog);
