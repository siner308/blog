import React from 'react';
import { graphql } from 'gatsby';
import Layout from './Layout';
import Comments from './Comments';
import Tag from './Tag';

const PostDetail = ({ data }: any): JSX.Element => {
  const { markdownRemark: post, site } = data;
  return (
    <Layout title={post.frontmatter.title} siteName={site.siteMetadata.siteName}>
      <hr/>
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
      <Comments/>
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
                tags
                title
                subtitle
                date(formatString: "YYYY/MM/DD")
            }
        }
    }
`;
