import { Link } from 'gatsby';
import React from 'react';

function Header({ siteName }: { siteName: string }): React.ReactElement {
  return (
    <div>
      <Link to={'/'} style={{ fontSize: 'large', color: 'black', textDecoration: 'none' }}>
        <h1>{siteName}</h1>
      </Link>
    </div>
  );
}

export default Header;
