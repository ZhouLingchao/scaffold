import React from 'react';
import { Select } from 'antd';

export default (props) => {
  const { Option } = Select;
  return (
    <Select {...props}>
      <Option value="1">所有权限</Option>
    </Select>
  );
};
