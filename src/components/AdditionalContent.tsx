import { Link } from 'gatsby';
import { getPostPath } from '../utils/date';
import React from 'react';
import { backgroundStyle } from '../style/backgroundStyle';

interface AdditionalContentProps {
  previous: any;
  next: any;
}

function AdditionalContent(props: AdditionalContentProps) {
  const { previous, next } = props;
  const cursorStyle = {
    ...backgroundStyle,
    borderRadius: 20,
    border: 'hidden',
    padding: 20,
    width: '48%',
    textDecoration: 'none',
    color: 'black',
  };

  return <div style={{
    display: 'flex',
    justifyContent: 'space-between',
  }}>
    {previous ?
      <>
        <Link style={{ ...cursorStyle, float: 'left' }}
              to={getPostPath(previous.childMarkdownRemark.frontmatter.date, previous.name)}>
          <strong>{previous.childMarkdownRemark.frontmatter.title}</strong>
          {previous.childMarkdownRemark.frontmatter.subtitle && <>
          <hr/>
          <p>{previous.childMarkdownRemark.frontmatter.subtitle}</p>
          </>}
        </Link>
      </>
      : <span style={{ ...cursorStyle, float: 'left', textAlign: 'center' }}>이전글이 없습니다.</span>}
    {next ?
      <>
        <Link style={{ ...cursorStyle, float: 'right' }}
              to={getPostPath(next.childMarkdownRemark.frontmatter.date, next.name)}>
          <strong>{next.childMarkdownRemark.frontmatter.title}</strong>
          {next.childMarkdownRemark.frontmatter.subtitle && <>
            <hr/>
            <p>{next.childMarkdownRemark.frontmatter.subtitle}</p></>}
        </Link>
      </>
      : <div style={{ ...cursorStyle, float: 'right', textAlign: 'center' }}>다음글이 없습니다.</div>}
  </div>;
}

export default AdditionalContent;
