import React from 'react';
import { graphql } from 'gatsby';
import Layout from './layout';

const Post = ({ data }: any): JSX.Element => {
  const post = data.markdownRemark;
  return (
    <Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <h3>{post.frontmatter.subtitle}</h3>
        <p>{post.frontmatter.date}</p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  );
};

export default Post;

export const pageQuery: void = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        subtitle
        date(formatString: "YYYY/MM/DD")
      }
    }
  }
`;
