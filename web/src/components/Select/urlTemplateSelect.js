import React, { PureComponent } from 'react';
import { Select } from 'antd';
import { connect } from 'dva';
import PropTypes from 'prop-types';

const { Option } = Select;
@connect(({ common }) => ({ // dva封装后的react-router组件,用于添加dispatch
  common,
}))
export default class UrlTemplateSelect extends PureComponent {
  componentDidMount() {
    const { common: { data }, url, payload } = this.props;
    if (!data[url]) {
      const { dispatch } = this.props;
      dispatch({
        type: 'common/fetch',
        required: {
          url,
        },
        payload,
      });
    }
  }
  render() {
    const { common: { data }, url } = this.props;
    return (
      <Select {...this.props}>{
        data[url] && data[url].map((val) => {
          return (<Option key={val.id}>{val.name}</Option>);
        })
      }
      </Select>
    );
  }
}

UrlTemplateSelect.propTypes = {
  url: PropTypes.string.isRequired, // 必须是有效的枚举名称
  payload: PropTypes.object,
};

UrlTemplateSelect.defaultProps = {
  payload: {},
};
