import React, { PureComponent } from 'react';
import { Tree } from 'antd';
import { getMenuData } from 'common/menu';
import { formatToTreeNode } from 'utils/tree';

export default class AuthorityTree extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checkedKeys: [],
    };
  }
  render() {
    return (
      <Tree
        checkable
        defaultExpandAll
        checkedKeys={this.state.checkedKeys}
      >
        {
          getMenuData().map(formatToTreeNode)
        }
      </Tree>
    );
  }
}
