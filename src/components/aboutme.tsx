import React from 'react';
import { graphql } from 'gatsby';
import Layout from './Layout';
import { Site } from '../types/siteMetadata';
import Content from './Content';

interface AboutMeData {
  site: Site;
  markdownRemark: {
    html: string;
  };
}

export const pageQuery: void = graphql`
    query {
        site {
            siteMetadata {
                siteName
                image
            }
        }
        markdownRemark(fileAbsolutePath: {regex: "/aboutme/"}) {
            html
        }
    }
`;

const aboutme = ({ data }: { data: AboutMeData }): JSX.Element => {
  const { markdownRemark: post, site } = data;
  return (
    <Layout title={'About Me'} siteName={site.siteMetadata.siteName} image={site.siteMetadata.image} maxWidth={840}>
      <Content>
        <div dangerouslySetInnerHTML={{ __html: post.html }}/>
      </Content>
    </Layout>
  );
};

export default aboutme;
