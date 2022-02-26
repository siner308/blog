import React from 'react';
import { rhythm } from '../utils/typography';
import { Helmet } from 'react-helmet';
import Header from './Header';

interface LayoutProps {
  children?: React.ReactNode;
  siteName: string;
  title: string;
  maxWidth?: number;
}

function Layout(props: LayoutProps): React.ReactElement {
  const { children, title, siteName, maxWidth }: LayoutProps = props;
  return (
    <div
      style={{
        margin: '0 auto',
        marginTop: rhythm(1),
        marginBottom: rhythm(1.5),
        maxWidth: maxWidth || 1200,
        paddingLeft: rhythm(3 / 4),
        paddingRight: rhythm(3 / 4),
      }}
    >
      <Helmet>
        <meta charSet={'utf-8'}/>
        <title>{title}</title>
      </Helmet>
      <Header siteName={siteName}/>
      <hr/>
      {children}
      <div
        style={{
          position: 'fixed',
          zIndex: 99,
          borderRadius: '10px',
          bottom: '20px',
          right: '30px',
          border: 'none',
          outline: 'none',
          padding: '15px',
          alignSelf: 'center',
          fontSize: '18px',
        }}
      >
        <button
          style={{
            cursor: 'pointer',
          }}
          onClick={(): void => {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
          }}
        >
          ⬆
        </button>
      </div>
    </div>
  );
}

export default Layout;
