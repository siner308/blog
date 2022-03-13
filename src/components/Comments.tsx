import React, { createRef, useLayoutEffect } from 'react';

const Comments: React.FC = React.memo(() => {
  const containerRef = createRef<HTMLDivElement>();

  useLayoutEffect(() => {
    const utterances = document.createElement('script');

    const attributes = {
      src: 'https://utteranc.es/client.js',
      repo: 'siner308/blog-posts',
      'issue-term': 'title',
      label: 'comment',
      theme: 'github-light',
      crossOrigin: 'anonymous',
      async: 'true',
    };

    Object.entries(attributes).forEach(([ key, value ]) => {
      utterances.setAttribute(key, value);
    });

    containerRef.current!.appendChild(utterances);
  }, []);

  return <div ref={containerRef}/>;
});

Comments.displayName = 'Comments';

export default Comments;
