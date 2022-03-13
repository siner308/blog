import { graphql, Link } from 'gatsby';
import React from 'react';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import PostList from '../components/PostList';
import { IndexPageProps, RemarkableFileSystemNode } from '../declarations';
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
import Tag from '../components/Tag';
import { backgroundStyle } from '../style/backgroundStyle';

deckDeckGoHighlightElement();

export const pageQuery: void = graphql`
    query IndexQuery($tag: String) {
        site {
            siteMetadata {
                siteName
                image
            }
        }
        filteredFiles: allFile(filter: {dir: {regex: "/blog-posts/"}, extension: {eq: "md"}, childrenMarkdownRemark: {elemMatch: {frontmatter: {tags: {eq: $tag}, draft: {ne: true}}}}}, sort: {fields: childMarkdownRemark___frontmatter___date, order: DESC}) {
            totalCount
            nodes {
                id
                childMarkdownRemark {
                    excerpt(format: PLAIN, pruneLength: 500)
                    id
                    frontmatter {
                        title
                        subtitle
                        date(formatString: "YYYY/MM/DD")
                        tags
                        image
                    }
                    fields {
                        readingTime {
                            text
                        }
                    }
                }
                name
            }
        }
        allFilesForTags: allFile(filter: {dir: {regex: "/blog-posts/"}, extension: {eq: "md"}}) {
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
    node.childMarkdownRemark.frontmatter?.tags?.forEach((tag: string) => {
      if (!tags.includes(tag)) tags.push(tag);
    });
  });
  return (
    <>
      <Layout title={site.siteMetadata.siteName} siteName={site.siteMetadata.siteName} image={site.siteMetadata.image}>
        <PostList allFile={filteredFiles}/>
        <br/>
        <div style={{lineHeight: 2}}>
          <Tag key={'all'} name={'all'} url={'/'} marginRight={8}/>
          {tags.sort().map((tag) => <Tag key={tag} name={tag} url={`/tag/${tag.toLowerCase()}/`} marginRight={8}/>)}
        </div>
        <Footer/>
      </Layout>
    </>
  );
};

export default Index;
