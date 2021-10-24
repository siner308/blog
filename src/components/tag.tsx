import { Link } from 'gatsby';
import React from 'react';

export interface TagProps {
  tag: string;
  marginRight: number;
}

const Tag = (props: TagProps): JSX.Element => {
  const { tag, marginRight } = props;
  return (
    <Link to={`/tag/${tag.toLowerCase()}/`}><span
      style={{
        marginRight,
        backgroundColor: 'antiquewhite',
        borderRadius: '6px',
        padding: 2,
      }}>#{tag.toLowerCase()}</span>
    </Link>
  );
};

export default Tag;
