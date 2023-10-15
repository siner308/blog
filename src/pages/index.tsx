import { graphql, Link, StaticQueryDocument } from 'gatsby';
import React from 'react';
import Layout from '../components/Layout';
import PostList from '../components/PostList';
import { IndexPageProps, RemarkableFileSystemNode } from '../declarations';
import Tag from '../components/Tag';
import { isBrowser } from '../utils/browser';

export const pageQuery: StaticQueryDocument = graphql`
query PageQuery {
  site {
    siteMetadata {
      siteName
      image
    }
  }
  filteredFiles: allFile(
    filter: {dir: {regex: "/blog-posts/"}, extension: {eq: "md"}, childrenMarkdownRemark: {elemMatch: {frontmatter: {draft: {ne: true}}}}}
    sort: {fields: childMarkdownRemark___frontmatter___date, order: DESC},
  ) {
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
  allFilesForTags: allFile(
    filter: {dir: {regex: "/blog-posts/"}, extension: {eq: "md"}, childrenMarkdownRemark: {elemMatch: {frontmatter: {draft: {ne:true}}}}}
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

const Index = (props: IndexPageProps) => {
  if (!isBrowser()) {
    return null;
  }

  const { allFilesForTags, filteredFiles, site } = props.data;
  const tags: string[] = [];

  // ?page=$page&tag=$tag
  const urlParams = new URLSearchParams(window.location.search);
  const page: number = parseInt(urlParams.get('page') || '1');
  const tag: string = urlParams.get('tag') || '';
  const limit = 12;
  const skip = (page - 1) * limit;

  // filter by tag
  const allNodes = filteredFiles.nodes
    .filter((node: RemarkableFileSystemNode) => {
      if (!tag) return true;
      return node.childMarkdownRemark.frontmatter?.tags?.includes(tag);
    })

  const nodes = allNodes.slice(skip, skip + limit);

  const maxPage = Math.ceil(allNodes.length / 12);
  allFilesForTags.nodes.forEach((node: RemarkableFileSystemNode) => {
    node.childMarkdownRemark.frontmatter?.tags?.forEach((tag: string) => {
      if (!tags.includes(tag)) tags.push(tag);
    });
  });
  return (
    <>
      <Layout
        title={site.siteMetadata.siteName}
        siteName={site.siteMetadata.siteName}
        image={site.siteMetadata.image}
      >
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
        }}>
          <Tag key={'all'} value={'all'} />
          {tags.sort().map((tag) => <Tag key={tag} value={tag} />)}
        </div>
        <hr/>
        <PostList nodes={nodes}/>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 8,
          margin: '1rem 0',
        }}
        >
        {/*  1 to maxPage */}
          {Array.from(Array(maxPage).keys()).map((i) => {
            const currentPage = i + 1;
            return (
              <Link
                key={currentPage}
                to={`/?page=${currentPage}${tag ? `&tag=${tag}` : ''}`}
                style={{
                  textDecoration: 'none',
                  color: currentPage === page ? '#fff' : '#000',
                  backgroundColor: currentPage === page ? '#000' : '#fff',
                  padding: '0.5rem 0.75rem',
                  borderRadius: 4,
                }}
              >
                {currentPage}
              </Link>
            );
          })}
        </div>
      </Layout>
    </>
  );
};

export default Index;
