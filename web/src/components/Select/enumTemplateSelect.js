import React, { PureComponent } from 'react';
import { Select } from 'antd';
import { connect } from 'dva';
import PropTypes from 'prop-types';

const { Option } = Select;
@connect(({ common }) => ({ // dva封装后的react-router组件,用于添加dispatch
  common,
}))
export default class EnumTemplateSelect extends PureComponent {
  componentDidMount() {
    const { common: { enums }, name } = this.props;
    if (!enums[name]) {
      const { dispatch } = this.props;
      dispatch({
        type: 'common/fetchEnums',
        payload: {
          name,
        },
      });
    }
  }
  render() {
    const { common: { enums }, name } = this.props;
    return (
      <Select {...this.props}>{
        enums[name] && enums[name].map((val) => {
          return (<Option key={val.value}>{val.text}</Option>);
        })
      }
      </Select>
    );
  }
}

EnumTemplateSelect.propTypes = {
  name: PropTypes.string.isRequired, // 必须是有效的枚举名称
};

