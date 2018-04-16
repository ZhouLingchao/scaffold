import React from 'react';
import { Link, Redirect, Switch, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import GlobalFooter from '../components/GlobalFooter';
import styles from './UserLayout.less';
import logo from '../assets/logo.png';
import { getRoutes } from '../utils/utils';

const copyright = (
  <div>
    <p>Copyright <Icon type="copyright" /> Copyright © 2017 . All Rights Reserved.</p>
    <p>浙江星冠信息技术有限公司 版权所有 | ICP证：浙B2-20170127</p>
  </div>
);

class UserLayout extends React.PureComponent {
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = WEB_TITLE; // eslint-disable-line
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - ${title}}`;
    }
    return title;
  }
  render() {
    const { routerData, match } = this.props;
    const title = WEB_TITLE; // eslint-disable-line
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={logo} />
                </Link>
                <h1 style={{ display: 'inline' }} > {title} </h1>
              </div>
            </div>
            <Switch>
              {getRoutes(match.path, routerData).map(item =>
                (
                  <Route
                    key={item.key}
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                  />
                )
              )}
              <Redirect exact from="/user" to="/user/login" />
            </Switch>
          </div>
          <GlobalFooter copyright={copyright} />
        </div>
      </DocumentTitle >
    );
  }
}

export default UserLayout;
