import React, { PureComponent } from 'react';
import { Col, Form } from 'antd';

const FormItem = Form.Item;
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
