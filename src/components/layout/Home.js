import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page">
      <h1>Alan Bi's Home Page</h1>
      <h4>This is the home page for my website.</h4>

      <Link to="/blog">
        Blog
      </Link>
      <Link to="/about">
        About
      </Link>
    </div>
  );
}

export default Home;
