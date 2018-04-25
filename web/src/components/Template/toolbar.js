import React, { PureComponent } from 'react';
import { Row } from 'antd';
import styles from './index.less';

export default class ToolBar extends PureComponent {
  render() {
    const { getTools, component } = this.props;
    return (
      <div className={styles.tools}>
        <Row>
          {
            getTools(component)
          }
        </Row>
      </div>
    );
  }
}
