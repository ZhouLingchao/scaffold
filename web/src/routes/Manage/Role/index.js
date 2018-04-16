import React, { PureComponent } from 'react';
import { Form, Table, Tree, Col, Row, Button, message, Spin } from 'antd';
import { connect } from 'dva';
import PageHeaderLayout from 'layouts/PageHeaderLayout';
import { getMenuData } from 'common/menu';
import { formatToTreeNode } from 'utils/tree';
import styles from 'common/base.less';
import CreateForm from './CreateForm';

@connect(({ role, loading }) => ({ // dva封装后的react-router组件,用于添加dispatch
  role,
  rolesLoading: loading.effects['role/fetchRoles'],
}))
@Form.create()
export default class Role extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedRowKey: '',
      loading: false,
    };
  }
  componentDidMount() {
    this.query();
  }
  getColumns = () => {
    return [
      {
        title: '角色名',
        dataIndex: 'roleName',
      },
    ];
  }
  handleAdd = (fieldsValue, authorities) => {
    this.toggleLoading();
    const { dispatch } = this.props;
    dispatch({
      type: 'role/createRole',
      payload: {
        ...fieldsValue,
        paths: authorities,
      },
      callback: () => {
        this.query();
        this.handleModalVisible();
        this.toggleLoading();
      },
    });
  }
  // 绑定权限与state变量
  handleCheck = (checkedKeys) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'role/saveAuthorities',
      payload: checkedKeys,
    });
  }
  // 点击角色时触发
  handleChange = (record, selected) => {
    this.setState({
      selectedRowKey: selected[0].id,
      loading: true,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'role/fetchAuthorities',
      payload: {
        roleId: selected[0].id,
      },
      callback: this.toggleLoading,
    });
  }
  handleModalVisible = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  }
  handleSave = () => {
    const { selectedRowKey } = this.state;
    if (!selectedRowKey) {
      message.info('请先选择角色');
      return;
    }
    this.toggleLoading();
    const { role: { data: { authorities } }, dispatch } = this.props;
    dispatch({
      type: 'role/updateRole',
      payload: {
        roleId: this.state.selectedRowKey,
        paths: authorities,
      },
      callback: () => {
        message.success('保存成功');
        this.toggleLoading();
      },
    });
  }
  query = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'role/fetchRoles',
    });
  }
  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading,
    });
  }
  render() {
    const { role: { data: { roles, authorities } }, rolesLoading } = this.props;
    return (
      <PageHeaderLayout title="角色设置">
        <Spin spinning={this.state.loading}>
          <div className={styles.content}>
            <Row style={{ marginTop: 20 }}>
              <Col md={6} xs={24} push={1}>
                <Button onClick={this.handleModalVisible} type="primary" style={{ marginBottom: 20 }}>新增</Button>
                <Table
                  bordered
                  columns={this.getColumns()}
                  dataSource={roles}
                  loading={rolesLoading}
                  rowSelection={{
                    fixed: true,
                    type: 'radio',
                    hideDefaultSelections: true,
                    onChange: this.handleChange,
                  }}
                  pagination={false}
                  rowKey="id"
                />
              </Col>
              <Col md={14} xs={24} push={2}>
                <Button onClick={this.handleSave} type="primary" style={{ marginBottom: 20 }}>保存</Button>
                <Tree
                  checkable
                  defaultExpandAll
                  checkedKeys={authorities}
                  onCheck={this.handleCheck}
                >
                  {
                    getMenuData().map(formatToTreeNode)
                  }
                </Tree>
              </Col>
            </Row>
          </div>
          <CreateForm
            modalVisible={this.state.modalVisible}
            handleAdd={this.handleAdd}
            handleModalVisible={this.handleModalVisible}
          />
        </Spin>
      </PageHeaderLayout >
    );
  }
}
