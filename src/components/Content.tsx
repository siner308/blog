import React from 'react';
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';

deckDeckGoHighlightElement();

interface ContentProps {
  children?: React.ReactNode;
}

function Content(props: ContentProps) {
  const { children } = props;
  return <article className="markdown-body entry-content container-lg" style={{
    backgroundColor: 'rgba(255, 255, 255, 0.80)',
    padding: '20px',
    boxShadow: '0 8px 16px 0 rgba( 0, 0, 0, 0.37 )',
    borderRadius: 20,
  }}>
    {children}
  </article>;
}

export default Content;
