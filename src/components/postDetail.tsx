import React from 'react';
import { graphql } from 'gatsby';
import Layout from './layout';
import { Helmet } from 'react-helmet';

const Post = ({ data }: any): JSX.Element => {
  const post = data.markdownRemark;
  return (
    <Layout>
      <Helmet>
        <meta charSet={'utf-8'} />
        <title>{post.frontmatter.title}</title>
        <meta name="description" content={post.frontmatter.subtitle} />
      </Helmet>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <h3>{post.frontmatter.subtitle}</h3>
        <p>{post.frontmatter.date}</p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
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
