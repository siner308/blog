import { Link } from 'gatsby';
import React from 'react';
import { backgroundStyle } from '../style/backgroundStyle';
import { isBrowser } from '../utils/browser';

export interface TagProps {
  value: string;
}

const Tag = (props: TagProps) => {
  if (!isBrowser()) {
    return null;
  }

  const { value } = props;
  const search = new URLSearchParams(window.location.search);
  const tag = value || search.get('tag');
  const selected = search.get('tag') === value;
  const url = selected ? `/?page=1` : `/?page=1&tag=${value}`;
  return (
    <Link
      style={{
        textDecoration: 'none',
        ...(selected && {
          fontWeight: 'bold',
          color: 'black',
        }),
      }}
      to={url}
    >
      <code>{value}</code>
    </Link>
  );
};

export default Tag;
