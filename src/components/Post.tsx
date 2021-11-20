import { Link } from 'gatsby';
import React from 'react';
import { RemarkableFileSystemNode } from '../declarations';
import { DateJson, getDateJson, getPostPath } from '../utils/date';

const Post = ({ node }: { node: RemarkableFileSystemNode }): JSX.Element => {
  const { childMarkdownRemark } = node;
  const dateJson: DateJson = getDateJson(node.childMarkdownRemark.frontmatter.date);
  return (
    <div
      // TODO: https://sohee1702.tistory.com/117?category=788998 포스트잇 효과도 이뻐보인다
      // TODO: https://post.naver.com/viewer/postView.nhn?volumeNo=7781411 이것도 이쁘다
      style={{
        backgroundColor: 'antiquewhite',
        width: 'auto',
        filter: 'drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.25))',
        marginBottom: 30,
        marginTop: 30,
      }}
    >
      <Link
        to={getPostPath(node.childMarkdownRemark.frontmatter.date, node.name)}
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <div
          style={{
            marginRight: 10,
            marginLeft: 10,
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 'bold' }}>{childMarkdownRemark.frontmatter.title}</span>
            <span>{`${dateJson.year}년 ${dateJson.month}월 ${dateJson.day}일`}</span>
          </div>
          {childMarkdownRemark.frontmatter.subtitle && (
            <div style={{ fontWeight: 'normal' }}>{childMarkdownRemark.frontmatter.subtitle}</div>
          )}
          <div style={{ fontWeight: 'lighter', fontSize: 'small' }}>{childMarkdownRemark.excerpt}</div>
        </div>
      </Link>
    </div>
  );
};

export default Post;
