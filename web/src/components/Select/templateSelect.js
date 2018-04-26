import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { EnumTemplateSelect } from './enumTemplateSelect';
import { UrlTemplateSelect } from './defaultTemplateSelect';

@connect(({ common }) => ({ // dva封装后的react-router组件,用于添加dispatch
  common,
}))
export default class TemplateSelect extends PureComponent {
  render() {
    const { type, isEnum, payload } = this.props;
    return isEnum ? (
      <EnumTemplateSelect name={type} />
    )
      :
      (
        <UrlTemplateSelect url={type} payload={payload} />
      );
  }
}

TemplateSelect.propTypes = {
  type: PropTypes.string.isRequired, // 后台接口路径或者枚举名称（根据isEnum参数
  isEnum: PropTypes.bool, // 是否是枚举类型
  payload: PropTypes.object,
};

TemplateSelect.defaultProps = {
  isEnum: false,
  payload: {},
};
