import { Link } from 'gatsby';
import React from 'react';
import { rhythm } from '../utils/typography';

function Header({ siteName }: { siteName: string }): React.ReactElement {
  return (
    <div style={{ paddingTop: rhythm(1), justifyContent: 'space-between', display: 'flex', alignItems: 'baseline' }}>
      <Link to={'/'} style={{ fontSize: 'large', color: 'black', textDecoration: 'none' }}>
        <h1>{siteName}</h1>
      </Link>
      <Link to={'/aboutme'} style={{ fontSize: 'large', color: 'black', textDecoration: 'none' }}>
        <h3>about me</h3>
      </Link>
    </div>
  );
}

export default Header;
