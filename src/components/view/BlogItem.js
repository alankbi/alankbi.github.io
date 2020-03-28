import React from 'react';
import { UnstyledLink } from './Link';
import BlogPosts from '../../data/BlogPosts'
import { BlogItemTitleText } from '../view/Text';
import { BlogItemContainer, BlogItemTextContainer } from '../view/Container'
import { Link } from 'react-router-dom';
import { BlogItemImage } from './Image';


function BlogItem(props) {
  const blog = BlogPosts[props.blog];
  const linkOptions = blog.markdown ? { as: Link, to: '/blog/' + props.blog}
                                    : { as: 'a', href: props.blog, target: '_blank' };
  return (
    <UnstyledLink {...linkOptions}>
      <BlogItemContainer>
        <BlogItemImage src={blog.image} alt={"Blog item image"} />

        <BlogItemTextContainer>
          <BlogItemTitleText>{blog.title}</BlogItemTitleText>
        </BlogItemTextContainer>
      </BlogItemContainer>
    </UnstyledLink>
  );
}

export default BlogItem;
