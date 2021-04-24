import React from 'react';
import { AllFile, RemarkableFileSystemNode } from '../declarations';
import Post from './post';

const PostList = ({ allFile }: { allFile: AllFile }): JSX.Element => {
  const { nodes, totalCount } = allFile;
  return (
    <>
      <div>
        <p>{totalCount}개의 게시글이 있습니다.</p>
        {totalCount && nodes.map((node: RemarkableFileSystemNode) => <Post key={node.id} node={node} />)}
      </div>
      <div
        style={{
          position: 'fixed',
          zIndex: 99,
          borderRadius: '10px',
          bottom: '20px',
          right: '30px',
          border: 'none',
          outline: 'none',
          padding: '15px',
          alignSelf: 'center',
          fontSize: '18px',
        }}
      >
        <button
          style={{
            cursor: 'pointer',
          }}
          onClick={(): void => {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
          }}
        >
          ⬆
        </button>
      </div>
    </>
  );
};
export default PostList;
