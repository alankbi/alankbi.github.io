import React from 'react';
import { Link } from 'react-router-dom';

export function About() {
  return (
    <div className="about-page">
      <h1>Alan Bi's About Page</h1>
      <h4>This is the about page for my website.</h4>

      <Link to="/">
        Home
      </Link>
      <Link to="/blog">
        Blog
      </Link>
    </div>
  );
}

export default About;
