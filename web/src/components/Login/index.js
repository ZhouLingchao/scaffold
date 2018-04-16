import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Tabs } from 'antd';
import classNames from 'classnames';
import LoginItem from './LoginItem';
import LoginTab from './LoginTab';
import LoginSubmit from './LoginSubmit';
import styles from './index.less';

@Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    const result = {};
    Object.keys(props.formValue).forEach((key) => {
      result[key] = Form.createFormField({
        ...props.formValue[key],
        value: props.formValue[key].value,
      });
    });
    return result;
  },
})
class Login extends Component {
  static defaultProps = {
    className: '',
    onTabChange: () => { },
    onSubmit: () => { },
  };
  static propTypes = {
    className: PropTypes.string,
    onTabChange: PropTypes.func,
    onSubmit: PropTypes.func,
  };
  static childContextTypes = {
    tabUtil: PropTypes.object,
    form: PropTypes.object,
    updateActive: PropTypes.func,
  };
  state = {
    tabs: [],
    active: {},
  };
  getChildContext() {
    return {
      tabUtil: {
        addTab: (id) => {
          this.setState({
            tabs: [...this.state.tabs, id],
          });
        },
        removeTab: (id) => {
          this.setState({
            tabs: this.state.tabs.filter(currentId => currentId !== id),
          });
        },
      },
      form: this.props.form,
      updateActive: (activeItem) => {
        const { active } = this.state;
        const type = this.props.activeKey;
        if (active[type]) {
          active[type].push(activeItem);
        } else {
          active[type] = [activeItem];
        }
        this.setState({
          active,
        });
      },
    };
  }
  onSwitch = (type) => {
    this.props.onTabChange(type);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { active } = this.state;
    const type = this.props.activeKey;
    const activeFileds = active[type];
    this.props.form.validateFields(activeFileds, { force: true },
      (err, values) => {
        this.props.onSubmit(err, values);
      }
    );
  }
  render() {
    const { className, children } = this.props;
    const { tabs } = this.state;
    const type = this.props.activeKey;
    const TabChildren = [];
    const otherChildren = [];
    React.Children.forEach(children, (item) => {
      if (!item) {
        return;
      }
      // eslint-disable-next-line
      if (item.type.__ANT_PRO_LOGIN_TAB) {
        TabChildren.push(item);
      } else {
        otherChildren.push(item);
      }
    });
    return (
      <div className={classNames(className, styles.login)}>
        <Form onSubmit={this.handleSubmit}>
          {
            tabs.length ? (
              <div>
                <Tabs
                  animated={false}
                  className={styles.tabs}
                  activeKey={type}
                  onChange={this.onSwitch}
                >
                  {TabChildren}
                </Tabs>
                {otherChildren}
              </div>
            ) : [...children]
          }
        </Form>
      </div>
    );
  }
}

Login.Tab = LoginTab;
Login.Submit = LoginSubmit;
Object.keys(LoginItem).forEach((item) => {
  Login[item] = LoginItem[item];
});

export default Login;
