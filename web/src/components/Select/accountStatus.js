import React from 'react';
import { Select } from 'antd';

export default (props) => {
  const { Option } = Select;
  return (
    <Select {...props}>
      <Option value="10">正常</Option>
      <Option value="20">冻结</Option>
      <Option value="30">删除</Option>
    </Select>
  );
};
