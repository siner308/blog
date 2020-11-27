import { graphql, PageProps } from "gatsby";
import React from "react";
import Layout from "../components/layout";

interface IndexPageProps extends PageProps {
  data: {
    site: {
      siteMetadata: {
        siteName: string;
      };
    };
  };
}

export const pageQuery: void = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        siteName
      }
    }
  }
`;

export default class IndexPage extends React.Component<IndexPageProps> {
  public render(): JSX.Element {
    const { siteName } = this.props.data.site.siteMetadata;
    return (
      <Layout>
        <h1>Gatsby 블로그 구축중</h1>
        <p>조금만 기다려주세요...</p>
        <p>{siteName}</p>
      </Layout>
    );
  }
}
