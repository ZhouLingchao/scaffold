import React, { PureComponent } from 'react';
import { Col, Form } from 'antd';

const FormItem = Form.Item;

// 配合TemplateQueryPage页面使用的表单模板
// 可以减少一部分代码量（ 主要是antd的getFieldDecorator方法
// 可以不使用该模板，直接使用antd示例代码方式
export default class TemplateCol extends PureComponent {
  render() {
    const { getFieldDecorator, children, ...rest } = this.props;
    return (
      <Col {...rest}>
        <FormItem {...rest.itemOption}>
          {getFieldDecorator(rest.key, rest.options)(
            children
          )}
        </FormItem>
      </Col>
    );
  }
}
