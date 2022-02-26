import React from 'react';
import { graphql } from 'gatsby';
import Layout from './Layout';
import { Site } from '../types/siteMetadata';

interface AboutMeData {
  site: Site;
  markdownRemark: {
    html: string;
  }
}

const AboutMe = ({ data }: { data: AboutMeData }): JSX.Element => {
  const { markdownRemark: post, site } = data;
  return (
    <Layout title={'About Me'} siteName={site.siteMetadata.siteName}>
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
