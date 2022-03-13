import React from 'react';
import { AllFile, RemarkableFileSystemNode } from '../declarations';
import Post from './Post';

const PostList = ({ allFile }: { allFile: AllFile }): JSX.Element => {
  const { nodes, totalCount } = allFile;
  return (
    <div>
      <p>{totalCount}개의 게시글이 있습니다.</p>
      <div className='post-grid'>
        {totalCount && nodes.map((node: RemarkableFileSystemNode) => <Post key={node.id} node={node}/>)}
      </div>
    </div>
  );
};
export default PostList;
