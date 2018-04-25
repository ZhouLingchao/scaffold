import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Modal } from 'antd';

@connect(({ edit }) => ({ edit }))
@Form.create({
  onFieldsChange(props, changeFields) {
    const { dispatch } = props;
    dispatch({
      type: 'edit/saveData',
      payload: changeFields,
    });
  },
  mapPropsToFields(props) {
    const { edit: { data } } = props;
    if (!data) return {};
    const fields = {};
    Object.keys(data).forEach((key) => {
      fields[key] = Form.createFormField({
        ...data[key],
      });
    });
    return fields;
  },
})
export default class EditForm extends PureComponent {
  // 保存时根据id字段触发编辑或新增方法，提供表单参数
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
  handleModalVisible = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'edit/toggleVisible',
    });
  }
  render() {
    const {
      edit: { // 专门提供新增修改使用的model
        visible, // 控制弹出层是否显示，可通过 edit/toggleVisible, edit/save 更改
        title, // 控制弹出层的标题, 可通过 edit/saveTitle, edit/save 更改
      },
      getEditForm,
      form,
      loading,
    } = this.props;

    return (
      <Modal
        title={title}
        visible={visible}
        onOk={this.okHandle}
        onCancel={this.handleModalVisible}
        maskClosable={false}
        confirmLoading={loading}
      >
        {getEditForm(form)}
      </Modal>
    );
  }
}
