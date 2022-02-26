import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from './Layout';
import Comments from './Comments';
import Tag from './Tag';
import { Site } from '../types/siteMetadata';
import { AllFile, ChildMarkdownRemark } from '../declarations';
import { getPostPath } from '../utils/date';
import { backgroundStyle } from '../style/backgroundStyle';

interface PostDetailData {
  site: Site;
  markdownRemark: ChildMarkdownRemark;
  cursor: AllFile;
}

const PostDetail = ({ data }: { data: PostDetailData }): JSX.Element => {
  const { markdownRemark: post, site, cursor } = data;
  const targetEdge = cursor.edges.find((edge) => edge.node.childMarkdownRemark.id === post.id);
  if (!targetEdge) throw Error('target edge not found');

  const cursorStyle = {
    ...backgroundStyle,
    borderRadius: 10,
    border: 'hidden',
    padding: 20,
    width: '40%',
    textDecoration: 'none',
    color: 'black',
  };
  return (
    <Layout title={post.frontmatter.title} siteName={site.siteMetadata.siteName} maxWidth={800}>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <h3>{post.frontmatter.subtitle}</h3>
          <p>{post.frontmatter.date}</p>
        </div>
      </div>
      {/*<div*/}
      {/*  dangerouslySetInnerHTML={{ __html: post.tableOfContents }}*/}
      {/*  className={'table-of-contents'}*/}
      {/*  style={{ right: 30 }}*/}
      {/*/>*/}
      <hr/>
      <div dangerouslySetInnerHTML={{ __html: post.html }}/>
      <div>
        {post.frontmatter.tags && post.frontmatter.tags.map((tag: string, idx: number) => {
          const marginRight: number = idx != post.frontmatter.tags.length - 1 ? 4 : 0;
          return <Tag tag={tag} marginRight={marginRight}/>;
        })}
      </div>
      <br/>
      <hr/>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {targetEdge.previous ?
          <>
            <Link style={{ ...cursorStyle, float: 'left', marginLeft: 20 }}
                  to={getPostPath(targetEdge.previous.childMarkdownRemark.frontmatter.date, targetEdge.previous.name)}>
              <strong>{'⬅'} {targetEdge.previous.childMarkdownRemark.frontmatter.title}</strong>
              <hr/>
              <p>{targetEdge.previous.childMarkdownRemark.frontmatter.subtitle}</p>
            </Link>
          </>
          : <div style={{ ...cursorStyle, float: 'left' }}>이전글이 없습니다.</div>}
        {targetEdge.next ?
          <>
            <Link style={{ ...cursorStyle, float: 'right', marginRight: 20 }}
                  to={getPostPath(targetEdge.next.childMarkdownRemark.frontmatter.date, targetEdge.next.name)}>
              <strong>{targetEdge.next.childMarkdownRemark.frontmatter.title} {'➡'}</strong>
              <hr/>
              <p>{targetEdge.next.childMarkdownRemark.frontmatter.subtitle}</p>
            </Link>
          </>
          : <div style={{ ...cursorStyle, float: 'right' }}>다음글이 없습니다.</div>}
      </div>
      <Comments/>
    </Layout>
  );
};

export default PostDetail;

export const pageQuery: void = graphql`
    query ($slug: String!) {
        site {
            siteMetadata {
                siteName
            }
        }
        markdownRemark(fields: {slug: {eq: $slug}}) {
            id
            html
            # tableOfContents(absolute: false)
            frontmatter {
                tags
                title
                subtitle
                date(formatString: "YYYY/MM/DD")
            }
        }
        cursor: allFile(filter: {dir: {regex: "/blog-posts/"}, extension: {eq: "md"}}, sort: {fields: childMarkdownRemark___frontmatter___date, order: DESC}) {
            edges {
                previous {
                    name
                    childMarkdownRemark {
                        frontmatter {
                            title
                            subtitle
                            date(formatString: "YYYY/MM/DD")
                        }
                    }
                }
                next {
                    name
                    childMarkdownRemark {
                        frontmatter {
                            title
                            subtitle
                            date(formatString: "YYYY/MM/DD")
                        }
                    }
                }
                node {
                    childMarkdownRemark {
                        id
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    }
`;
