import React, { PureComponent } from 'react';
import { Row } from 'antd';
import { wrapField } from './defaultQueryForm';

// 有调用方提供自行提供按钮
export default class CustomQueryForm extends PureComponent {
  render() {
    const { getFields, component, form } = this.props;
    return (
      <Row>
        {
          getFields(component).map(field => wrapField(field, form.getFieldDecorator))
        }
      </Row>
    );
  }
}
