import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Modal, Input, Button } from 'antd';
import StateSelect from 'components/Select/state';

const { TextArea } = Input;

@connect(({ edit }) => ({ edit }))
@Form.create({
  onFieldsChange(props, changeFields) {
    const { dispatch } = props;
    console.log('`````````````editform``````````````');
    console.log(props);
    console.log(changeFields);

    dispatch({
      type: 'edit/save',
      payload: changeFields,
    });
  },
  mapPropsToFields(props) {
    return {
      account: Form.createFormField({
        ...props.edit.account,
        value: props.edit.account.value,
      }),
      state: Form.createFormField({
        value: '0',
      }),
    };
  },
})
export default class EditForm extends PureComponent {
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
    const requiredOption = {
      rules: [{ required: true }],
    };
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
            {form.getFieldDecorator('id', requiredOption)(
              <Input placeholder="id" type="hidden" />
            )}
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="账号"
          >
            {form.getFieldDecorator('account', requiredOption)(
              <Input disabled placeholder="请输入" />
            )}
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="密码"
          >
            {form.getFieldDecorator('password')(
              <Input disabled setfieldsvalue={modalvalue.password} placeholder="不重置则不更改密码" />
            )}
            <Button onClick={this.resetPassword}>重置密码</Button>
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="姓名"
          >
            {form.getFieldDecorator('name', requiredOption)(
              <Input placeholder="请输入" />
            )}
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="电话"
          >
            {form.getFieldDecorator('mobileNo', requiredOption)(
              <Input placeholder="请输入" />
            )}
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="备注"
          >
            {form.getFieldDecorator('remark', requiredOption)(
              <TextArea placeholder="备注" rows={4} />
            )}
          </FormItem>
          <FormItem>
            {
              form.getFieldDecorator('state')(
                <StateSelect />
              )
            }
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
