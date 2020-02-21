import React from 'react';
import { Link } from 'react-router-dom';

export function NavBar() {
  return (
    <div className="navbar">
      <nav>
        <Link to="/blog">
          Blog
        </Link>
        <Link to="/">
          Alan Bi
        </Link>
        <Link to="/about">
          About
        </Link>
      </nav>
    </div>
  );
}

export default NavBar;
