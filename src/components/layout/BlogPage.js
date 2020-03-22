import React, { Component } from 'react';
import { HeaderText, TitleText } from '../view/Text';
import { BlogPageContainer, CenteredContainer, HeaderContainer, LeftAlignedContainer } from '../view/Container';
import { BlogImage } from '../view/Image';
import NotFound from './NotFound'
import { withTheme } from 'styled-components';
import { withRouter} from 'react-router-dom';
import BlogPosts from '../../data/BlogPosts';
import ReactMarkdown from 'react-markdown';

class ProjectPage extends Component {
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
          <HeaderContainer margin={"40px"}>
            <TitleText>Loading...</TitleText>
          </HeaderContainer>
        </BlogPageContainer>
      );
    }

    return (
      <BlogPageContainer className="blog-post-page">
        <HeaderContainer margin={"40px"}>
          <HeaderText>{blog.title}</HeaderText>
        </HeaderContainer>

        <CenteredContainer>
          <BlogImage src={blog.image} alt={blog.title} />

          <LeftAlignedContainer className="blog-content">
            <ReactMarkdown source={this.state.markdown} />
          </LeftAlignedContainer>
        </CenteredContainer>
      </BlogPageContainer>
    );
  }
}

export default withRouter(withTheme(ProjectPage));
