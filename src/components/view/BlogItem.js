import React from 'react';
import { UnstyledLink } from './Link';
import BlogPosts from '../../data/BlogPosts'
import { NormalText, BlogTitleText } from '../view/Text';
import { BlogContainer, BlogItemTextContainer } from '../view/Container'
import { Link } from 'react-router-dom';
import { BlogItemImage } from './Image';


function BlogItem(props) {
  const blog = BlogPosts[props.blog];
  return (
    <UnstyledLink as={Link} to={"/blog/" + props.blog}>
      <BlogContainer>
        <BlogItemImage src={blog.image} alt={"Blog item image"} />
        <BlogItemTextContainer>
          <BlogTitleText>{blog.title}</BlogTitleText>
        </BlogItemTextContainer>
      </BlogContainer>
    </UnstyledLink>
  );
}

export default BlogItem;
