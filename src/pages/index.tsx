import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import Footer from '../components/footer';
import PostList from '../components/postlist';
import { IndexPageProps } from '../declarations';

export const pageQuery: void = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        siteName
      }
    }
    allFile(
      filter: { extension: { eq: "md" } }
      sort: { fields: childMarkdownRemark___frontmatter___date, order: DESC }
    ) {
      totalCount
      nodes {
        id
        childMarkdownRemark {
          excerpt(format: PLAIN, truncate: false)
          id
          frontmatter {
            title
            subtitle
            date(formatString: "YYYY년 MM월 DD일")
          }
        }
        name
      }
    }
  }
`;

const Index = ({ data }: IndexPageProps): JSX.Element => {
  const { siteName } = data.site.siteMetadata;
  const allFile = data.allFile;
  return (
    <>
      <Layout>
        <h1>{siteName}</h1>
        <PostList allFile={allFile} />
        <Footer />
      </Layout>
    </>
  );
};

export default Index;
