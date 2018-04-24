import React from 'react';
import { Select } from 'antd';

export default (props) => {
  console.log('``````````````state``````````````````');
  console.log(props);
  
  const { Option } = Select;
  return (
    <Select {...props}>
      <Option value="0">启用</Option>
      <Option value="1">禁用</Option>
    </Select>
  );
};
