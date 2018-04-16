import React, { PureComponent, Fragment } from 'react';
import { Form, Row, Col, Button, Table } from 'antd';
import styles from '../../common/base.less';
import TemplateCol from './templateCol';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

/*
  通用模板，输出一个常规的增删查改页面,具体可参考log.js，classsetting.js页面
    api, 包含antd Table组建的所有props
        model={model}  数据模型,约束位于文件夹/src/models下，需要在/src/commom/router.js注入
        query={this.query} 查询方法委托
        getFields={this.getFields} 查询表单方法委托
          提供TemplateCol模板,可省略FormItem,getFieldDecorator等，相当于简写版本
          *此模板较简单，若查询表单情况复杂，可使用antd示例代码自行编写代码
          api
            增加options={startDateOption}，为getFieldDecorator方法第二个参数
        title="浏览日志" 面包屑下方法标题
        rowKey="id" 提供了默认rowKey="id"
*/
class TemplateQueryPage extends PureComponent {
  constructor(props) { // 构造函数
    super(props);
    this.state = {
      formValues: {},
      pagination: { pageSize: 10, current: 1, total: 0 },
    };
  }
  // 页面加载完成理解查询
  componentDidMount() {
    if (this.props.autoQuery) {
      this.handleRefTable();
    }
  }
  getDefaultForm = () => {
    const { getFields, exportConfig } = this.props;
    return (
      <Fragment>
        <Row gutter={24}>{getFields().map(this.wrapField)}</Row>
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button type="default" className={styles.formButton} onClick={this.handleReset}>重置</Button>
            {
              exportConfig && (
                <Button type="primary" className={styles.formButton} onClick={this.handleExport}>导出</Button>
              )
            }
          </Col>
        </Row>
      </Fragment>
    );
  }

  formatFieldsValue = (fieldsValue) => {
    const flatObject = {};
    Object.keys(fieldsValue).forEach((key) => {
      const value = fieldsValue[key];
      if (Array.isArray(value) && value.length === 2) {
        [flatObject[`${key}Start`], flatObject[`${key}End`]] = value;
      } else {
        flatObject[key] = value;
      }
    });
    const formatObject = {};
    Object.keys(flatObject).forEach((key) => {
      formatObject[key] = this.formatFieldValue(flatObject[key]);
    });
    return formatObject;
  }

  formatFieldValue = (fieldValue) => {
    if (fieldValue) {
      if (fieldValue._isAMomentObject) { // eslint-disable-line
        return fieldValue.format(fieldValue._f || 'YYYY-MM-DD'); // eslint-disable-line
      }
    }
    return fieldValue;
  }
  // 导出
  handleExport = () => {
    const { form, dispatch, exportConfig } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({
        formValues: fieldsValue,
      });
      dispatch({
        type: 'export/xlsx',
        required: {
          ...exportConfig,
        },
        payload: this.formatFieldsValue(fieldsValue),
      });
    });
  }

  // 重置
  handleReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    this.props.query();
  }
  // 页数变换处理函数
  handlePageChange = (pagination) => {
    const { formValues } = this.state;

    const params = {
      pageIndex: pagination.current,
      pageSize: pagination.pageSize,
      ...this.formatFieldsValue(formValues),
    };
    this.setState({ pagination });
    this.props.query(params);
  }
  // 查询
  handleSearch = (e) => {
    e.preventDefault();
    this.handleRefTable();
  }
  handleRefTable = () => {
    const { form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      this.setState({
        formValues: fieldsValue,
        pagination: { pageSize: 10, current: 1, total: 0 },
      });

      this.props.query(this.formatFieldsValue(fieldsValue));
    });
  }
  wrapField = (field) => {
    const { getFieldDecorator } = this.props.form;
    const wrapField = {
      ...field,
      props: {
        getFieldDecorator,
        key: field.key,
        ...field.props,
      },
    };
    return wrapField;
  }
  // 渲染
  render() {
    const {
      model: { data }, columns, customQuery, getFields, title, tools, ...rest
    } = this.props;
    const { pagination } = this.state;
    const wrapTotalPagination = {
      ...pagination,
      total: data.total,
      showTotal: total => `总计 ${total} 行`,
      showQuickJumper: true,
    };

    const wrapSeqColumns = [
      {
        title: '序号',
        dataIndex: 'autoIndex',
        render(text, record, index) {
          return index + 1;
        },
      },
      ...columns.map((col) => {
        return {
          sorter: (a, b) => (a[col.dataIndex] > b[col.dataIndex] ? 1 : -1),
          ...col,
        };
      }),
    ];


    const wrapProps = {
      ...rest,
      rowKey: rest.rowKey ? rest.rowKey : 'id',
      dataSource: data.data,
      columns: wrapSeqColumns,
      pagination: wrapTotalPagination,
      onChange: this.handlePageChange,
    };

    if (this.props.refTable) {
      this.props.refTable = this.handleRefTable;
    }
    return (
      <PageHeaderLayout title={title} >
        <div className={styles.content}>
          <Form
            onSubmit={this.handleSearch}
            className={styles.form}
          >
            {customQuery ? <Row>{getFields(this).map(this.wrapField)}</Row> : this.getDefaultForm()}
          </Form>
          {
            tools && (
              <div className={styles.tools}>
                <Row>
                  {
                    tools(this)
                  }
                </Row>
              </div>
            )
          }
          <Table
            {...wrapProps}
          />
        </div>
      </PageHeaderLayout>
    );
  }
}

TemplateQueryPage.Col = TemplateCol;

export default TemplateQueryPage;
