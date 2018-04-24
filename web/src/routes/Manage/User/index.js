import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, message } from 'antd';
import TemplateQueryPage from 'components/TemplateQueryPage';
import StateSelect from 'components/Select/state';
import styles from 'common/base.less';
import EditForm from './editform';

const { TCol } = TemplateQueryPage;

@connect(({ user, edit, loading }) => ({ // dva封装后的react-router组件,用于添加dispatch
  user,
  edit,
  loading: loading.models.user,
}))
@Form.create() // antd提供的form组件，不用手动添加每个Form.Item的state onChange控制问题
export default class User extends PureComponent {
  constructor(props) {
    super(props);
    // 展示列表
    this.columns = [
      {
        title: '操作',
        dataIndex: 'option',
        render: (value, row) => {
          return (<a onClick={() => { this.showEdit(row); }} >编辑</a>);
        },
      },
      {
        title: '客服账号',
        dataIndex: 'account',
      },
      {
        title: '客服姓名',
        dataIndex: 'name',
      },
      {
        title: '电话',
        dataIndex: 'mobileNo',
      },
      {
        title: '权限组',
        dataIndex: 'roleName',
      },
      {
        title: '状态',
        dataIndex: 'enable',
        render: val => (val === true ? '启用' : '禁用'),
      },
      {
        title: '备注',
        dataIndex: 'remark',
      },
      {
        title: '添加人',
        dataIndex: 'creator',
      },
    ];


    this.state = {
      modalVisible: false,
      modalvalue: {
        id: {
          value: 0,
        },
        name: {},
        remark: {},
      },
      modaloption: { title: '新增' },
    };
  }

  // 获取form的查询项
  getFields = () => {
    const children = [
      <TCol lg={4} xs={24} key="account">
        <Input placeholder="账户" />
      </TCol>,
      <TCol lg={4} xs={24} key="name">
        <Input placeholder="客户姓名" />
      </TCol>,
      <TCol lg={4} xs={24} key="mobileNo">
        <Input placeholder="客户电话" />
      </TCol>,
      <TCol lg={4} xs={24} key="creator">
        <Input placeholder="添加人" />
      </TCol>,
    ];
    return children;
  }

  // 获取编辑表单 , form参数必须由EditForm组件传递，否则参数无法赋值
  getEditForm = (form) => {
    const FormItem = Form.Item;
    const requiredOption = {
      rules: [{ required: true }],
    };
    const { TextArea } = Input;
    return (
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
            <Input disabled placeholder="不重置则不更改密码" />
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
    );
  }

  // 获取工具列按钮
  getTools = () => {
    return (
      <Fragment>
        <Button type="primary" className={styles.formButton} onClick={this.showAdd}>新增</Button>
      </Fragment>
    );
  }
  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }
  // 封装查询
  query = (params) => {
    this.updateSearchFileds(params);
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetch',
      payload: params,
    });
  }
  GetRandomPassword = () => {
    const s = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let password = '';
    for (let i = 0; i < 8; i += 1) {
      password += s[Math.floor(Math.random() * s.length)];
    }
    return password;
  }
  // 重置密码
  resetPassword = () => {
    const { GetRandomPassword } = this.props;
    this.props.form.setFieldsValue({
      password: GetRandomPassword(),
    });
  }
  // 弹出新增
  showAdd = () => {
    this.showRealAdd();
  }
  showRealAdd = () => {
    this.setState({
      ...this.state,
      modalvalue: { account: 'test', password: this.GetRandomPassword(), name: '', mobileNo: '', enable: 'true', roleId: '', remark: '', type: '', id: 0 },
      modaloption: { title: '新增' },
      modalVisible: !this.state.modalVisible,
    });
  }
  // 弹出编辑框修改
  showEdit = (row) => {
    const { dispatch } = this.props;
    const data = {};
    Object.keys(row).forEach((key) => {
      data[key] = {
        value: row[key],
      };
    });
    dispatch({
      type: 'edit/save',
      payload: {
        data,
        title: '修改',
        visible: true,
      },
    });
  }
  // 新增方法
  handleAdd = (fields) => {
    this.props.dispatch({
      type: 'user/Add',
      payload: {
        ...fields,
      },
      callback: () => {
        message.success('添加成功');
        this.query(this.searchFields);
        this.setState({
          modalVisible: false,
        });
      },
    });
  }
  // 编辑方法
  handleEdit = (fields) => {
    // 提交到后端
    this.props.dispatch({
      type: 'user/Edit',
      payload: {
        ...fields,
      },
      callback: () => {
        message.success('保存成功');
        this.query(this.searchFields);
        this.setState({
          modalVisible: false,
        });
      },
    });
  }
  handleFormChange = (changedFields) => {
    this.setState({
      modalvalue: { ...this.state.modalvalue, ...changedFields },
    });
  }
  // 禁用启用
  toggleStatus = (rows) => {
    const { dispatch } = this.props;
    dispatch({
      type: rows.enable ? 'user/disableUser' : 'user/enableUser',
      payload: { Id: rows.id, enableType: rows.enable ? 2 : 1 },
      callback: () => {
        message.success('操作成功');
        this.query(this.searchFields);
      },
    });
  }
  // 更新查询字段
  updateSearchFileds = (fields) => {
    this.searchFields = fields;
  }
  // 渲染
  render() {
    const { user, form, loading } = this.props;
    return (
      <Fragment>
        <TemplateQueryPage
          loading={loading}
          form={form}
          autoQuery
          model={user}
          query={this.query}
          getFields={this.getFields}
          getTools={this.getTools}
          columns={this.columns}
          title="用户管理"
          scroll={{ x: 900 }}
        />
        <EditForm
          onChange={this.handleFormChange}
          getEditForm={this.getEditForm}
        />
      </Fragment>
    );
  }
}
