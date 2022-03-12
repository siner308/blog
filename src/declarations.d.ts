// This file is used to hold ambient type declarations, as well as type shims
// for npm module without type declarations, and assets files.

// For example, to shim modules without declarations, use:
// declare module "package-without-declarations"

// And to shim assets, use (one file extension per `declare`):
// declare module "*.png"

import { PageProps } from 'gatsby';
import { FileSystemNode } from 'gatsby-source-filesystem';
import { IGatsbyEdge } from 'gatsby/dist/schema/type-definitions';

export interface IndexQueryProps {
  site: {
    siteMetadata: {
      siteName: string;
      image: string;
    };
  };
  filteredFiles: AllFile;
  allFilesForTags: AllFile;
}

export interface AllFile {
  totalCount: number;
  // pageInfo: {
  //   currentPage: number;
  //   hasNextPage: boolean;
  //   hasPreviousPage: boolean;
  // };
  edges: IGatsbyEdge<RemarkableFileSystemNode>[];
  nodes: RemarkableFileSystemNode[];
}

export interface RemarkableFileSystemNode extends FileSystemNode {
  childMarkdownRemark: ChildMarkdownRemark;
}

export type ChildMarkdownRemark = {
  id: string;
  excerpt: string;
  tableOfContents: string;
  html: string;
  frontmatter: {
    title: string;
    subtitle: string;
    date: string;
    tags: string[];
    image: string;
    draft: string;
  };
  fields: {
    readingTime: {
      text: string;
      // minutes: number;
      // time: number;
      // words: number;
    }
  }
};

export type IndexPageProps = PageProps<IndexQueryProps>;
