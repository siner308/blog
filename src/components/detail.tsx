import React from 'react';
import { graphql, StaticQueryDocument } from 'gatsby';
import Layout from './Layout';
import Comments from './Comments';
import Tag from './Tag';
import { Site } from '../types/siteMetadata';
import { AllFile, ChildMarkdownRemark } from '../declarations';
import AdditionalContent from './AdditionalContent';
import Content from './Content';

interface PostDetailData {
  site: Site;
  markdownRemark: ChildMarkdownRemark;
  cursor: AllFile;
}

export const pageQuery: StaticQueryDocument = graphql`
    query ($slug: String) {
        site {
            siteMetadata {
                siteName
            }
        }
        markdownRemark(fields: {slug: {eq: $slug}}) {
            id
            html
            excerpt(format: PLAIN, pruneLength: 500)
            # tableOfContents(absolute: false)
            frontmatter {
                tags
                title
                subtitle
                date(formatString: "YYYY/MM/DD")
                image
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

const detail = ({ data }: { data: PostDetailData }): JSX.Element => {
  const { markdownRemark: post, site, cursor } = data;
  const targetEdge = cursor.edges.find((edge) => edge.node.childMarkdownRemark.id === post.id);
  if (!targetEdge) throw Error('target edge not found');

  return (
    <Layout title={post.frontmatter.title} siteName={site.siteMetadata.siteName} maxWidth={840}
            image={post.frontmatter.image} excerpt={post.excerpt}>
      <Content>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div>
            <h1>{post.frontmatter.title}</h1>
            <h3>{post.frontmatter.subtitle}</h3>
          </div>
          <p style={{ display: 'flex', flexDirection: 'column-reverse', bottom: 0 }}>{post.frontmatter.date}</p>
        </div>
        <hr/>
        <div dangerouslySetInnerHTML={{ __html: post.html }}/>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {post.frontmatter.tags && post.frontmatter.tags.map((tag: string) => {
            return <Tag name={tag} url={`/tag/${tag.toLowerCase()}/`}/>;
          })}
        </div>
        <br/>
        <hr/>
        <div style={{ marginBottom: '-10px' }}>
          <AdditionalContent previous={targetEdge.previous} next={targetEdge.next}/>
          <Comments/>
        </div>
      </Content>
    </Layout>
  );
};

export default detail;
