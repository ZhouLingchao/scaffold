import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, message } from 'antd';
import TemplateQueryPage from 'components/Template/templateQueryPage';
import EditForm from 'components/Template/editform';
import EnumTemplateSelect from 'components/Select/enumTemplateSelect';
import RoleSelect from 'components/Select/role';
import styles from 'common/base.less';

const { TCol } = TemplateQueryPage;
const FormItem = Form.Item;
@connect(({ user, edit, loading }) => ({ // dva封装后的react-router组件,用于添加dispatch
  user,
  edit,
  loading: loading.effects['user/fetch'],
  saveLoading: loading.effects['user/create'] || loading.effects['user/update'],
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
        title: '用户账号',
        dataIndex: 'code',
      },
      {
        title: '真实姓名',
        dataIndex: 'realName',
      },
      {
        title: '手机号',
        dataIndex: 'mobile',
      },
      {
        title: '邮箱',
        dataIndex: 'eMail',
      },
      {
        title: '账号状态',
        dataIndex: 'accountStatus',
      },
      {
        title: '权限组',
        dataIndex: 'roleName',
      },
    ];
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
    const { edit: { data } } = this.props;
    const isEdit = data.id && data.id.value > 0;
    const requiredOption = {
      rules: [{ required: true }],
    };
    const colOption = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 },
    };
    return (
      <Form>
        <FormItem style={{ display: 'none' }} >
          {form.getFieldDecorator('id')(
            <Input placeholder="id" type="hidden" />
          )}
        </FormItem>
        <FormItem
          {...colOption}
          label="用户账号"
        >
          {form.getFieldDecorator('code', {
            rules: [{
              required: true, message: '请输入账号',
            }, {
              pattern: /^[0-9]{4,8}$/, message: '账号只支持4-8位数字',
            }],
          })(
            <Input disabled={isEdit} placeholder="请输入" />
          )}
        </FormItem>
        {!isEdit && (
          <FormItem
            {...colOption}
            label="密码"
          >
            {form.getFieldDecorator('password', {
              rules: [{
                required: true, message: '请输入密码',
              }, {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{6,20}$/, message: '密码支持6-20位，必须包含数字、字母大小写',
              }

              ]
            })(
              <Input placeholder="请输入" type="password" />
            )}
          </FormItem>
        )}
        <FormItem
          {...colOption}
          label="真实姓名"
        >
          {form.getFieldDecorator('realName', requiredOption)(
            <Input placeholder="请输入" />
          )}
        </FormItem>
        <FormItem
          {...colOption}
          label="手机号"
        >
          {form.getFieldDecorator('mobile', {
            rules: [{
              required: true, message: '请输入手机号',
            }, {
              pattern: /^1\d{10}$/, message: '手机号格式错误',
            }],
          })(
            <Input placeholder="请输入" />
          )}
        </FormItem>
        <FormItem
          {...colOption}
          label="邮箱"
        >
          {form.getFieldDecorator('eMail', {
            rules: [{
              pattern: /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/, message: '邮箱格式错误',
            }],
          })(
            <Input placeholder="请输入" />
          )}
        </FormItem>
        <FormItem
          {...colOption}
          label="账号状态"
        >
          {form.getFieldDecorator('accountStatus', requiredOption)(
            <EnumTemplateSelect name="EAccountStatus" />
          )}
        </FormItem>
        <FormItem
          {...colOption}
          label="权限组"
        >
          {form.getFieldDecorator('roleId', requiredOption)(
            <RoleSelect />
          )}
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
  // 设置查询方法
  setRequery = (query) => {
    this.requery = query;
  }
  // 封装查询
  query = (params) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetch',
      payload: params,
    });
  }

  // 弹出新增
  showAdd = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'edit/save',
      payload: {
        data: {},
        title: '新增',
        visible: true,
      },
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
    this.handleSave('user/create', fields, '添加成功');
  }
  // 编辑方法
  handleEdit = (fields) => {
    this.handleSave('user/update', fields, '保存成功');
  }

  handleSave = (type, fields, msg) => {
    const { dispatch } = this.props;
    // 提交到后端
    dispatch({
      type,
      payload: {
        ...fields,
      },
      callback: () => {
        message.success(msg);
        dispatch({
          type: 'edit/toggleVisible',
        });
        this.requery();
      },
    });
  }
  // 渲染
  render() {
    const { user, form, loading, saveLoading } = this.props;
    return (
      <Fragment>
        <TemplateQueryPage
          loading={loading}
          form={form}
          model={user}
          autoQuery
          query={this.query}
          getFields={this.getFields}
          getTools={this.getTools}
          columns={this.columns}
          title="用户管理"
          setRequery={this.setRequery}
          scroll={{ x: 900 }}
        />
        <EditForm
          loading={saveLoading}
          getEditForm={this.getEditForm}
          handleAdd={this.handleAdd}
          handleEdit={this.handleEdit}
        />
      </Fragment>
    );
  }
}
