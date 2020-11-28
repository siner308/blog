import { Link } from 'gatsby';
import React from 'react';
import { RemarkableFileSystemNode } from '../declarations';

const Post = ({ node }: { node: RemarkableFileSystemNode }): JSX.Element => {
  const { childMarkdownRemark } = node;
  return (
    <div
      style={{
        backgroundColor: 'antiquewhite',
        width: '900px',
        height: 130,
        filter: 'drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.25))',
        marginBottom: '30px',
        marginTop: '30px',
      }}
    >
      <Link to={node.name} style={{ textDecoration: 'none', color: 'black' }}>
        <div style={{ paddingLeft: '10px', paddingRight: '10px' }}>
          <span>
            {childMarkdownRemark.frontmatter.title} {childMarkdownRemark.frontmatter.date}
          </span>
          <div>{childMarkdownRemark.frontmatter.subtitle}</div>
          <div>{childMarkdownRemark.excerpt}</div>
        </div>
      </Link>
    </div>
  );
};

export default Post;
