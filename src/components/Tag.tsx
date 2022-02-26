import { Link } from 'gatsby';
import React from 'react';
import { backgroundStyle } from '../style/backgroundStyle';

export interface TagProps {
  tag: string;
  marginRight: number;
}

const Tag = (props: TagProps): JSX.Element => {
  const { tag, marginRight } = props;
  return (
    <Link to={`/tag/${tag.toLowerCase()}/`}><button
      style={{
        ...backgroundStyle,
        marginRight,
        borderRadius: '6px',
        border: 'hidden',
        padding: 2,
        cursor: 'pointer',
      }}>#{tag.toLowerCase()}</button>
    </Link>
  );
};

export default Tag;
