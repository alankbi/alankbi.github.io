import React from 'react';
import { HeaderText } from '../view/Text';
import { CenteredContainer, HeaderContainer, LeftAlignedContainer } from '../view/Container';
import { SquareImage } from '../view/Image';
import NotFound from './NotFound'
import { withTheme } from 'styled-components';
import { useParams } from 'react-router-dom';
import BlogPosts from '../../data/BlogPosts';

function ProjectPage(props) {
  const params = useParams();
  let blog = null;
  if (params.blog in BlogPosts) {
    blog = BlogPosts[params.blog];
  } else {
    return <NotFound/>;
  }

  return (
    <div className="blog-post-page">
      <HeaderContainer margin={"55px"}>
        <HeaderText color={props.theme.colors.current}>{blog.title}</HeaderText>
      </HeaderContainer>

      <CenteredContainer>
        <SquareImage src={blog.image} alt={blog.title} />

        <LeftAlignedContainer className="blog-content">
          Text
        </LeftAlignedContainer>
      </CenteredContainer>
    </div>
  );
}

export default withTheme(ProjectPage);
