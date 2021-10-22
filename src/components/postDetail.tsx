import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from './layout';
import { Helmet } from 'react-helmet';
import Comments from './Comments';

const PostDetail = ({ data }: any): JSX.Element => {
  const post = data.markdownRemark;
  const site = data.site;
  return (
    <Layout>
      <Helmet>
        <meta charSet={'utf-8'} />
        <title>{post.frontmatter.title}</title>
        <meta name="description" content={post.frontmatter.subtitle} />
      </Helmet>
      <div>
        <Link to={'/'} style={{ fontSize: 'large', color: 'black', textDecoration: 'none' }}>
          <h1>{site.siteMetadata.siteName}</h1>
        </Link>
      </div>
      <hr />
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h3>{post.frontmatter.subtitle}</h3>
          <p>{post.frontmatter.date}</p>
        </div>
      </div>
      {/*<div*/}
      {/*  dangerouslySetInnerHTML={{ __html: post.tableOfContents }}*/}
      {/*  className={'table-of-contents'}*/}
      {/*  style={{ right: 30 }}*/}
      {/*/>*/}
      <hr />
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <hr />
      <Comments />
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

export default PostDetail;

export const pageQuery: void = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        siteName
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      tableOfContents(absolute: false)
      frontmatter {
        title
        subtitle
        date(formatString: "YYYY/MM/DD")
      }
    }
  }
`;
