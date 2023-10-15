import React from 'react';
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';

deckDeckGoHighlightElement();

interface ContentProps {
  children?: React.ReactNode;
}

function Content(props: ContentProps) {
  const { children } = props;
  return (
    <article className="markdown-body entry-content container-lg">
      {children}
    </article>
  );
}

export default Content;
