import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import Footer from '../components/footer';
import PostList from '../components/postlist';
import { IndexPageProps } from '../declarations';
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
import { Helmet } from 'react-helmet';
deckDeckGoHighlightElement();

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
          excerpt(format: PLAIN, pruneLength: 210)
          id
          frontmatter {
            title
            subtitle
            date(formatString: "YYYY/MM/DD")
          }
        }
        name
      }
    }
  }
`;

const Index = (props: IndexPageProps): JSX.Element => {
  const { siteName } = props.data.site.siteMetadata;
  const allFile = props.data.allFile;
  return (
    <>
      <Layout>
        <Helmet>
          <meta charSet={'utf-8'} />
          <title>{siteName}</title>
        </Helmet>
        <h1>{siteName}</h1>
        <PostList allFile={allFile} />
        <Footer />
      </Layout>
    </>
  );
};

export default Index;
