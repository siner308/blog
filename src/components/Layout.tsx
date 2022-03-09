import React from 'react';
import { rhythm } from '../utils/typography';
import { Helmet } from 'react-helmet';
import Header from './Header';

interface LayoutProps {
  children?: React.ReactNode;
  siteName: string;
  title: string;
  maxWidth?: number;
  image?: string;
  excerpt?: string;
}

function Layout(props: LayoutProps): React.ReactElement {
  const { children, title, siteName, maxWidth, image, excerpt }: LayoutProps = props;
  return (
    <div
      style={{
        margin: '0 auto',
        marginTop: rhythm(1),
        marginBottom: rhythm(1.5),
        maxWidth: maxWidth || 1410,
        paddingLeft: rhythm(3 / 4),
        paddingRight: rhythm(3 / 4),
      }}
    >
      <Helmet>
        <title>{title}</title>
        <meta charSet={'utf-8'}/>
        excerpt && <meta property="og:description" content={excerpt}/>
        image && <meta property="og:image" content={image}/>
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
