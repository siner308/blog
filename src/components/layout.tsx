import React from 'react';

import { rhythm } from '../utils/typography';

const Layout: React.FC = ({ children }: { children?: React.ReactNode }) => (
  <div
    style={{
      margin: '0 auto',
      marginTop: rhythm(1),
      marginBottom: rhythm(1.5),
      maxWidth: 800,
      paddingLeft: rhythm(3 / 4),
      paddingRight: rhythm(3 / 4),
    }}
  >
    {children}
  </div>
);

export default Layout;
