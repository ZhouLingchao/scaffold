import React from 'react';
import CheckPermissions from './CheckPermissions';

// 用于判断权限组件，通过判断返回组建，失败返回异常组件
class Authorized extends React.Component {
  render() {
    const { children, authority, noMatch = null } = this.props;
    const childrenRender = typeof children === 'undefined' ? null : children;
    return CheckPermissions(authority, childrenRender, noMatch);
  }
}

export default Authorized;
