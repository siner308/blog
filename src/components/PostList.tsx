import React from 'react';
import { AllFile, RemarkableFileSystemNode } from '../declarations';
import PostCard from './PostCard';

type Props = {
  nodes: Array<RemarkableFileSystemNode>;
}

const PostList = (props: Props): JSX.Element => {
  const { nodes } = props;
  return (
    <div>
      <div className='post-grid'>
        {nodes.length ? nodes.map((node: RemarkableFileSystemNode) => <PostCard key={node.id} node={node}/>) : null}
      </div>
    </div>
  );
};
export default PostList;
