import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import { Site } from '../types/siteMetadata';
import Content from '../components/Content';

interface AboutMeData {
  site: Site;
  markdownRemark: {
    html: string;
  }
}

const Aboutme = ({ data }: { data: AboutMeData }): JSX.Element => {
  const { markdownRemark: post, site } = data;
  return (
    <Layout title={'About Me'} siteName={site.siteMetadata.siteName} image={site.siteMetadata.image} maxWidth={800}>
      <Content>
        <div dangerouslySetInnerHTML={{ __html: post.html }}/>
      </Content>
    </Layout>
  );
};

export default Aboutme;

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
