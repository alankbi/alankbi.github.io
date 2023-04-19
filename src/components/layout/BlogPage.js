import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { withRouter } from 'react-router-dom';
import { withTheme } from 'styled-components';
import { HeaderText, NormalTextInline, TitleText, BlogPostTitleText, SmallText, PhotographyText } from '../view/Text';
import { BlogPageContainer, CenteredContainer, HeaderContainer, LeftAlignedContainer } from '../view/Container';
import { BlogImage } from '../view/Image';
import NotFound from './NotFound'
import BlogPosts from '../../data/BlogPosts';
import { UnderlinedExternalLink } from '../view/Link';

class BlogPage extends Component {
  constructor(props) {
    super(props);

    this.state = { markdown: null, blog: null, found: true, };
  }

  componentDidMount() {
    if (this.props.match.params.blog in BlogPosts) {
      const blog = BlogPosts[this.props.match.params.blog];

      fetch(blog.markdown)
        .then((response) => {
          return response.text()
        })
        .then((text) => {
          this.setState({
            markdown: text,
            blog,
          })
        })
    } else {
      this.setState({ found: false });
    }
  }

  render() {
    if (!this.state.found) {
      return <NotFound/>;
    }

    const blog = this.state.blog;
    if (!blog) {
      return (
        <BlogPageContainer className="blog-post-page">
          <HeaderContainer margin={"50px"}>
            <TitleText>Loading...</TitleText>
          </HeaderContainer>
        </BlogPageContainer>
      );
    }

    const options = {
      escapeHtml: false,
      linkTarget: '_blank',
      renderers: {
        text: !blog.photography ? NormalTextInline : PhotographyText,
        link: UnderlinedExternalLink,
        image: BlogImage,
        heading: BlogPostTitleText,
      }
    };

    return (
      <BlogPageContainer className="blog-post-page">
        <HeaderContainer margin={!blog.photography ? "50px" : "10px"}>
          <HeaderText>{!blog.photography ? blog.title : blog.photoTitle}</HeaderText>
        </HeaderContainer>

        <CenteredContainer>
          {!blog.photography ? (
            <SmallText>Published {blog.date} &nbsp;|&nbsp;&nbsp;Read on&nbsp;
              <UnderlinedExternalLink target={"_blank"} href={"https://medium.com/@alankbi"}>
                Medium
              </UnderlinedExternalLink>
            </SmallText>
          ) : <SmallText style={{marginBottom: "100px"}}>Published {blog.date}</SmallText>}

          {!blog.photography && <BlogImage src={blog.image} alt={blog.title} style={{marginBottom: "60px", marginTop: "10px"}} />}

          <LeftAlignedContainer className="blog-content">
            <ReactMarkdown source={this.state.markdown} {...options} />
          </LeftAlignedContainer>
        </CenteredContainer>
      </BlogPageContainer>
    );
  }
}

export default withRouter(withTheme(BlogPage));
