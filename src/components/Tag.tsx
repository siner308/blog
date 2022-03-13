import { Link } from 'gatsby';
import React from 'react';
import { backgroundStyle } from '../style/backgroundStyle';

export interface TagProps {
  name: string;
  url: string;
  marginRight: number;
}

const Tag = (props: TagProps): JSX.Element => {
  const { name, url, marginRight } = props;
  return (
    <Link to={url}><button
      style={{
        ...backgroundStyle,
        marginRight,
        borderRadius: '6px',
        border: 'hidden',
        padding: 2,
        cursor: 'pointer',
      }}>#{name.toLowerCase()}</button>
    </Link>
  );
};

export default Tag;
