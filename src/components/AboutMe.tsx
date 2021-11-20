import React from 'react';
import { graphql } from 'gatsby';
import Layout from './Layout';
import Comments from './Comments';
import Tag from './Tag';

const AboutMe = ({ data }: any): JSX.Element => {
  const { markdownRemark: post, site } = data;
  return (
    <Layout title={'About Me'} siteName={site.siteMetadata.siteName}>
      <hr/>
      <div dangerouslySetInnerHTML={{ __html: post.html }}/>
    </Layout>
  );
};

export default AboutMe;

export const pageQuery: void = graphql`
    query {
        site {
            siteMetadata {
                siteName
            }
        }
        markdownRemark(fileAbsolutePath: {regex: "/aboutme/"}) {
            html
        }
    }
`;
