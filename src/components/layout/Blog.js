import React from 'react';
import { Link } from 'react-router-dom';

export function Blog() {
  return (
    <div className="blog-page">
      <h1>Alan Bi's Blog Page</h1>
      <h4>This is the blog page for my website.</h4>

      <Link to="/">
        Home
      </Link>
      <Link to="/about">
        About
      </Link>
    </div>
  );
}

export default Blog;
