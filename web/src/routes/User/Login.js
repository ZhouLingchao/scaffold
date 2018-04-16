import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Checkbox, Alert, Icon, Input, message } from 'antd';
import Login from '../../components/Login';
import styles from './Login.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit, Area } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
  reseting: loading.effects['login/reset']
}))
export default class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
    formValue: {},
  }

  onTabChange = (type) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/changeTab',
      payload: {
        type,
      },
    });
  }
  handleHelp = (e) => {
    e.preventDefault();
    message.info('请联系客服，联系方式：400-112-8118');
  }
  handleSubmit = (err, values) => {
    const { type } = this.state;
    const { login } = this.props;
    const activeKey = login.type || type;
    if (!err) {
      this.props.dispatch({
        type: activeKey === 'account' ? 'login/login' : 'login/reset',
        payload: {
          ...values,
          type,
        },
      });
    }
  }
  handleFormValueChange = (formValue) => {
    this.setState({
      formValue: { ...this.state.formValue, ...formValue },
    });
  }
  changeAutoLogin = (e) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  }
  sendVerifyCode = () => {
    const { dispatch } = this.props;
    const { formValue } = this.state;
    if (!formValue.mobileNo || formValue.mobileNo.errors) {
      message.info('请输入手机号');
      return false;
    }
    dispatch({
      type: 'login/send',
      payload: { mobileNo: formValue.mobileNo.value },
      callback: () => {
        message.info('验证码发送成功，请注意接收');
      },
    });
    return true;
  }
  renderMessage = (content) => {
    return (
      <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
    );
  }
  render() {
    const { login, submitting, reseting } = this.props;
    const { type, formValue } = this.state;
    const activeKey = login.type || type;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          activeKey={activeKey}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          formValue={formValue}
          onChange={this.handleFormValueChange}
        >
          <Tab key="account" tab="" >
            <UserName name="account" placeholder="请输入账号" />
            <Password name="password" placeholder="请输入密码" />
          </Tab>
          <Submit loading={activeKey === 'account' ? submitting : reseting}>{
            activeKey === 'forget' ? '修改密码' : '登录'
          }
          </Submit>
        </Login>
      </div>
    );
  }
}
