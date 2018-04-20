import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Modal, Input, Button } from 'antd';

const { TextArea } = Input;
@connect(({ user, loading }) => ({ // dva封装后的react-router组件,用于添加dispatch
  user,
  loading: loading.models.user,
}))
@Form.create({
  onFieldsChange(props, changeFields) {
    console.log('```````````````createform`````````');
    console.log(props);
    
  },
  mapPropsToFields(props) {

  },
})
export default class CreateForm extends PureComponent {
  okHandle = () => {
    const { form, handleEdit, handleAdd } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      if (fieldsValue.id > 0) {
        handleEdit(fieldsValue);
      } else {
        handleAdd(fieldsValue);
      }
    });
  }
  resetPassword = () => {
    const { GetRandomPassword } = this.props;
    this.props.form.setFieldsValue({
      password: GetRandomPassword(),
    });
  }
  render() {
    const { modalVisible, form, handleModalVisible, title, modalvalue } = this.props;
    const FormItem = Form.Item;
    return (
      <Modal
        title={title}
        visible={modalVisible}
        onOk={this.okHandle}
        onCancel={() => handleModalVisible()}
        destroyOnClose
      >
        <Form>
          <FormItem style={{ display: 'none' }} >
            {form.getFieldDecorator('id', {
              rules: [{ required: true }],
              initialValue: modalvalue.id,
            })(
              <Input placeholder="id" type="hidden" />
            )}
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="账号"
          >
            {form.getFieldDecorator('account', {
              rules: [{ required: true }],
              initialValue: modalvalue.account,
            })(
              <Input disabled placeholder="请输入" />
            )}
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="密码"
          >
            {form.getFieldDecorator('password', {
              initialValue: modalvalue.password,
            })(
              <Input disabled setfieldsvalue={modalvalue.password} placeholder="不重置则不更改密码" />
            )}
            <Button onClick={this.resetPassword}>重置密码</Button>
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="姓名"
          >
            {form.getFieldDecorator('name', {
              rules: [{ required: true }],
              initialValue: modalvalue.name,
            })(
              <Input placeholder="请输入" />
            )}
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="电话"
          >
            {form.getFieldDecorator('mobileNo', {
              rules: [{ required: true }],
              initialValue: modalvalue.mobileNo,
            })(
              <Input placeholder="请输入" />
            )}
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="备注"
          >
            {form.getFieldDecorator('remark', {
              rules: [{ required: true }],
              initialValue: modalvalue.remark,
            })(
              <TextArea placeholder="备注" rows={4} />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
