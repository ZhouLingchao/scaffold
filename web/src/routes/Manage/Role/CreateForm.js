import React, { PureComponent } from 'react';
import { Form, Tree, Row, Modal, Input } from 'antd';
import { getMenuData } from 'common/menu';
import { formatToTreeNode } from 'utils/tree';

const FormItem = Form.Item;
@Form.create()
export default class CreateForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checkedKeys: [],
    };
  }
  handleCheck = (checkedKeys) => {
    this.setState({ checkedKeys });
  }
  render() {
    const { modalVisible, form, handleAdd, handleModalVisible } = this.props;
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        handleAdd(fieldsValue, this.state.checkedKeys);
      });
    };
    return (
      <Modal
        title="新建角色"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible()}
      >
        <Row>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="名称"
          >
            {form.getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入角色名称' }],
            })(
              <Input placeholder="请输入角色名称" />
            )}
          </FormItem>
        </Row>
        <Row>
          <Tree
            checkable
            defaultExpandAll
            checkedKeys={this.state.checkedKeys}
            onCheck={this.handleCheck}
          >
            {
              getMenuData().map(formatToTreeNode)
            }
          </Tree>
        </Row>
      </Modal>
    );
  }
}
