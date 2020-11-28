import React from 'react';
import { AllFile, RemarkableFileSystemNode } from '../declarations';
import Post from './post';

const PostList = ({ allFile }: { allFile: AllFile }): JSX.Element => {
  const { nodes, totalCount } = allFile;
  return (
    <div>
      <p>{totalCount}개의 게시글이 있습니다.</p>
      {totalCount && nodes.map((node: RemarkableFileSystemNode) => <Post key={node.id} node={node} />)}
    </div>
  );
};
export default PostList;
