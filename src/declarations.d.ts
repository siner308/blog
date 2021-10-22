// This file is used to hold ambient type declarations, as well as type shims
// for npm module without type declarations, and assets files.

// For example, to shim modules without declarations, use:
// declare module "package-without-declarations"

// And to shim assets, use (one file extension per `declare`):
// declare module "*.png"

import { PageProps } from 'gatsby';
import { FileSystemNode } from 'gatsby-source-filesystem';

export interface IndexQueryProps {
  site: {
    siteMetadata: {
      siteName: string;
    };
  };
  allFile: AllFile;
}

export interface AllFile {
  totalCount: number;
  // pageInfo: {
  //   currentPage: number;
  //   hasNextPage: boolean;
  //   hasPreviousPage: boolean;
  // };
  nodes: MarkdownRemarkNode[];
}

export interface RemarkableFileSystemNode extends FileSystemNode {
  childMarkdownRemark: ChileMarkdownRemark;
}

export type ChileMarkdownRemark = {
  id: string;
  excerpt: string;
  tableOfContents: string;
  frontmatter: {
    title: string;
    subtitle: string;
    date: string;
  };
};

export type IndexPageProps = PageProps<IndexQueryProps>;
