import { Link } from 'gatsby';
import React from 'react';
import { RemarkableFileSystemNode } from '../declarations';
import { DateJson, getDateJson, getPostPath } from '../utils/date';
import { backgroundStyle } from '../style/backgroundStyle';

const Post = ({ node }: { node: RemarkableFileSystemNode }): JSX.Element => {
  const { childMarkdownRemark } = node;
  const dateJson: DateJson = getDateJson(node.childMarkdownRemark.frontmatter.date);
  // TODO: https://sohee1702.tistory.com/117?category=788998 포스트잇 효과도 이뻐보인다
  // TODO: https://post.naver.com/viewer/postView.nhn?volumeNo=7781411 이것도 이쁘다
  return (
    <Link
      to={getPostPath(node.childMarkdownRemark.frontmatter.date, node.name)}
      style={{
        ...backgroundStyle, filter: 'drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.25))',
        textDecoration: 'none', color: 'black',
        overflow: 'hidden',
        height: '380px',
      }}
    >
      {childMarkdownRemark.frontmatter.image ?
        <img style={{ backgroundColor: 'white' }} src={childMarkdownRemark.frontmatter.image}
             alt={childMarkdownRemark.frontmatter.image}
             className={'post-card-image'}/>
        : <></>}
      <div style={{ padding: 10 }}>
        <div style={{ marginBottom: 10 }}>
          <span style={{ fontWeight: 'bold', fontSize: 'large' }}>{childMarkdownRemark.frontmatter.title}</span>
          <br/>
          {childMarkdownRemark.frontmatter.subtitle && <><span style={{
            fontWeight: 'lighter',
            fontSize: '14px',
          }}>{childMarkdownRemark.frontmatter.subtitle}</span><br/></>}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span
              style={{ fontWeight: 'lighter', fontSize: '14px' }}>{childMarkdownRemark.fields.readingTime.text}</span>
            <span style={{
              fontWeight: 'lighter',
              fontSize: '14px',
            }}>{`${dateJson.year}.${dateJson.month}.${dateJson.day}`}</span>
          </div>
        </div>
        <hr style={{ marginBottom: '10px' }}/>
        <p className="post-card-excerpt">{childMarkdownRemark.excerpt}</p>
      </div>
    </Link>
  );
};

export default Post;
