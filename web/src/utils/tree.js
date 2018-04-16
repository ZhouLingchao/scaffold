import React from 'react';
import { Tree } from 'antd';

const { TreeNode } = Tree;

export function formatToTreeNode(node) {
  return (
    <TreeNode title={node.name} key={node.path} >
      {
        node.children && node.children.map(formatToTreeNode)
      }
    </TreeNode>
  );
}

