import React, { PureComponent } from 'react';
import { Layout, Menu, Icon } from 'antd';
import pathToRegexp from 'path-to-regexp';
import { Link } from 'dva/router';
import { getMenuData } from 'common/menu';
import styles from './index.less';

const { Sider } = Layout;
const { SubMenu } = Menu;

// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'http://demo.com/icon.png',
//   icon: <Icon type="setting" />,
const getIcon = (icon) => {
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return <img src={icon} alt="icon" className={styles.icon} />;
  }
  if (typeof icon === 'string') {
    return <Icon type={icon} />;
  }
  return icon;
};

export default class SiderMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: this.getDefaultCollapsedSubMenus(props),
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        openKeys: this.getDefaultCollapsedSubMenus(nextProps),
      });
    }
  }
  /**
   * Convert pathname to openKeys
   * /list/search/articles = > ['list','/list/search']
   * @param  props
   */
  getDefaultCollapsedSubMenus(props) {
    const { location: { pathname } } = props || this.props;
    // eg. /list/search/articles = > ['','list','search','articles']
    let snippets = pathname.split('/');
    // Delete the end
    // eg.  delete 'articles'
    snippets.pop();
    // Delete the head
    // eg. delete ''
    snippets.shift();
    // eg. After the operation is completed, the array should be ['list','search']
    // eg. Forward the array as ['list','list/search']
    snippets = snippets.map((item, index) => {
      // If the array length > 1
      if (index > 0) {
        // eg. search => ['list','search'].join('/')
        return snippets.slice(0, index + 1).join('/');
      }
      // index 0 to not do anything
      return item;
    });
    // snippets = snippets.map((item) => {
    //   return this.getSelectedMenuKeys(`/${item}`)[0];
    // });
    // eg. ['list','list/search']
    return snippets;
  }
  /**
   * Recursively flatten the data
   * [{path:string},{path:string}] => {path,path2}
   * @param  menus
   */
  getFlatMenuKeys(menus) {
    let keys = [];
    menus.forEach((item) => {
      if (item.children) {
        keys.push(item.path);
        keys = keys.concat(this.getFlatMenuKeys(item.children));
      } else {
        keys.push(item.path);
      }
    });
    return keys;
  }
  /**
   * Get selected child nodes
   * /user/chen => /user/:id
   */
  getSelectedMenuKeys = (path) => {
    const flatMenuKeys = this.getFlatMenuKeys(this.props.menuData);
    return flatMenuKeys.filter((item) => {
      return pathToRegexp(`/${item}`).test(path);
    });
  }
  /**
  * 判断是否是http链接.返回 Link 或 a
  * Judge whether it is http link.return a or Link
  * @memberof SiderMenu
  */
  getMenuItemPath = (item) => {
    const itemPath = this.conversionPath(item.path);
    const icon = getIcon(item.icon);
    const { target, name } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}<span>{name}</span>
        </a>
      );
    }
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === this.props.location.pathname}
        onClick={this.props.isMobile ? () => { this.props.onCollapse(true); } : undefined}
      >
        {icon}<span>{name}</span>
      </Link>
    );
  }
  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = (item) => {
    if (item.children && item.children.some(child => child.name)) {
      return (
        <SubMenu
          title={
            item.icon ? (
              <span>
                {getIcon(item.icon)}
                <span>{item.name}</span>
              </span>
            ) : item.name
          }
          key={item.path}
        >
          {this.getNavMenuItems(item.children)}
        </SubMenu>
      );
    } else {
      return (
        <Menu.Item key={item.path}>
          {this.getMenuItemPath(item)}
        </Menu.Item>
      );
    }
  }
  /**
  * 获得菜单子节点
  * @memberof SiderMenu
  */
  getNavMenuItems = (menusData) => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => this.getSubMenuOrItem(item))
      .filter(item => !!item);
  }

  /**
   * 根据用户权限，新建菜单项
   * 1.将用户权限转成Set
   * 2.遍历所有菜单allmenu,过滤不在set中的菜单
   */
  getAuthMenuItems = (paths) => {
    const allMenu = getMenuData();
    const authPaths = this.getAuthPathSet(paths);
    return this.filterMenus(allMenu, authPaths);
  }

  getAuthPathSet = (paths) => {
    const authPaths = new Set();
    paths.forEach((path) => {
      const pathNodes = path.split('/');
      let tempPath = ''; // 暂存的路径，包括循环中产生的路径
      for (let i = 0; i < pathNodes.length; i += 1) {
        const pathNode = pathNodes[i];
        tempPath = tempPath ? `${tempPath}/${pathNode}` : pathNode;
        authPaths.add(tempPath);
      }
    });
    return authPaths;
  }

  filterMenus = (menus, authPaths) => {
    return menus.filter(item => authPaths.has(item.path))
      .map((item) => {
        return {
          ...item,
          children: item.children ? this.filterMenus(item.children, authPaths) : undefined,
        };
      });
  }
  // conversion Path
  // 转化路径
  conversionPath = (path) => {
    if (path && path.indexOf('http') === 0) {
      return path;
    } else {
      return `/${path || ''}`.replace(/\/+/g, '/');
    }
  }
  handleOpenChange = (openKeys) => {
    const lastOpenKey = openKeys[openKeys.length - 1];
    const isMainMenu = this.props.menuData.some(
      item => lastOpenKey && (item.key === lastOpenKey || item.path === lastOpenKey)
    );
    this.setState({
      openKeys: isMainMenu ? [lastOpenKey] : [...openKeys],
    });
  }
  render() {
    const { logo, collapsed, location: { pathname }, onCollapse, menuData } = this.props;
    const { openKeys } = this.state;
    // Don't show popup menu when it is been collapsed
    const menuProps = collapsed ? {} : {
      openKeys,
    };
    // if pathname can't match, use the nearest parent's key
    let selectedKeys = this.getSelectedMenuKeys(pathname);
    if (!selectedKeys.length) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }
    // filter menu
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={onCollapse}
        width={256}
        className={styles.sider}
      >
        <div className={styles.logo} key="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>云数管理平台</h1>
          </Link>
        </div>
        <Menu
          key="Menu"
          theme="dark"
          mode="inline"
          {...menuProps}
          onOpenChange={this.handleOpenChange}
          selectedKeys={selectedKeys}
          style={{ padding: '16px 0', width: '100%' }}
        >
          {this.getNavMenuItems(this.getAuthMenuItems(menuData))}
        </Menu>
      </Sider>
    );
  }
}
