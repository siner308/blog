import { graphql, Link } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import Footer from '../components/footer';
import PostList from '../components/postlist';
import { IndexPageProps, RemarkableFileSystemNode } from '../declarations';
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
import { Helmet } from 'react-helmet';
import Tag from '../components/tag';

deckDeckGoHighlightElement();

export const pageQuery: void = graphql`
    query IndexQuery($tag: String) {
        site {
            siteMetadata {
                siteName
            }
        }
        filteredFiles: allFile(
            filter: {
                extension: { eq: "md" },
                childrenMarkdownRemark: {
                    elemMatch: {
                        frontmatter: {
                            tags: {
                                eq: $tag
                            }
                        }
                    }
                }
            }
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
        allFilesForTags: allFile(
            filter: {
                extension: { eq: "md" }
            }
        ) {
            nodes {
              childMarkdownRemark {
                  frontmatter {
                      tags
                  }
              }
            }
        }
    }
`;

const Index = (props: IndexPageProps): JSX.Element => {
  const { allFilesForTags, filteredFiles, site } = props.data;
  const tags: string[] = [];

  allFilesForTags.nodes.forEach((node: RemarkableFileSystemNode) => {
    node.childMarkdownRemark.frontmatter.tags.forEach((tag: string) => {
      if (!tags.includes(tag)) tags.push(tag);
    });
  });
  return (
    <>
      <Layout>
        <Helmet>
          <meta charSet={'utf-8'}/>
          <title>{site.siteMetadata.siteName}</title>
        </Helmet>
        <div>
          <Link to={'/'} style={{ fontSize: 'large', color: 'black', textDecoration: 'none' }}>
            <h1>{site.siteMetadata.siteName}</h1>
          </Link>
        </div>
        <PostList allFile={filteredFiles}/>
        <div>
          <Link to='/'><span
            style={{
              marginRight: 8,
              backgroundColor: 'antiquewhite',
              borderRadius: '6px',
              padding: 2,
            }}>#all</span>
          </Link>
          {tags.sort().map((tag) => <Tag key={tag} tag={tag} marginRight={8}/>)}
        </div>
        <Footer/>
      </Layout>
    </>
  );
};

export default Index;
