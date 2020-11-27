import React from "react";

import { rhythm } from "../utils/typography";

const Layout: React.FC = ({ children }: { children?: React.ReactNode }) => (
  <div
    style={{
      margin: "0 auto",
      marginBottom: rhythm(1.5),
      marginTop: rhythm(1.5),
      maxWidth: 650,
      paddingLeft: rhythm(3 / 4),
      paddingRight: rhythm(3 / 4),
    }}
  >
    {children}
  </div>
);

export default Layout;
