import React, { PureComponent, Fragment } from 'react';
import { Row, Col, Button } from 'antd';
import styles from './index.less';

// customQuery == false , 自动添加查询、重置以及导出（exportConfig 不为空）按钮
export default class DefaultQueryForm extends PureComponent {
  render() {
    const { getFields, exportConfig, handleExport, getFieldDecorator, handleReset } = this.props;
    return (
      <Fragment>
        <Row gutter={24}>{getFields().map(field => wrapField(field, getFieldDecorator))}</Row>
        <div className={styles.tools}>
          <Row>
            <Col span={24} style={{ textAlign: 'center', marginTop: '-10px' }}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button type="default" className={styles.formButton} onClick={handleReset}>重置</Button>
              {
                exportConfig && (
                  <Button type="primary" className={styles.formButton} onClick={handleExport}>导出</Button>
                )
              }
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}
// 为表单查询字段提供封装方法
const wrapField = (field, getFieldDecorator) => {
  const wrappedField = {
    ...field,
    props: {
      ...field.props,
      getFieldDecorator,
      key: field.key,
    },
  };
  return wrappedField;
};

export { wrapField };
