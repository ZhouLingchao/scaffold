import React, { PureComponent, Fragment } from 'react';
import { Form, Row, Col, Button, Table } from 'antd';
import styles from '../../common/base.less';
import TemplateCol from './templateCol';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

/*
  通用模板，输出一个常规的增删查改页面,具体可参考manage/user.js页面
    具体api 参考render方法
*/
class TemplateQueryPage extends PureComponent {
  constructor(props) { // 构造函数
    super(props);
    this.state = this.getDefaultPagination();
  }
  // 页面加载完成理解查询
  componentDidMount() {
    if (this.props.autoQuery) {
      this.handleQuery();
    }
  }
  shouldComponentUpdate(nextProps, nextState){
    if(this.props.model.data !== nextProps.model.data){
      return true;
    }
    return false;
  }
  // 获取默认分页信息
  getDefaultPagination = () => {
    return {
      pagination: {
        pageSize: DEFAULT_PAGE_SIZE, // eslint-disable-line
        current: DEFAULT_PAGE_INDEX, // eslint-disable-line
      },
    };
  }
  // customQuery == false , 自动添加查询、重置以及导出（exportConfig 不为空）按钮
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
  // 有调用方提供自行提供按钮
  getCustomForm = () => {
    const { getFields } = this.props;
    return (
      <Row>
        {
          getFields(this).map(this.wrapField)
        }
      </Row>
    );
  }
  // 获取包裹了序号列的列组
  getWrapSeqColumns = () => {
    const { columns } = this.props;
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
    return wrapSeqColumns;
  }
  // 格式化所有字段参数
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
  // 格式化字段参数
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
    const { dispatch, exportConfig } = this.props;

    this.triggerRequestDelegate((params) => {
      const { pageIndex, pageSize, ...formValues } = params;
      dispatch({
        type: 'export/xlsx',
        required: {
          ...exportConfig,
        },
        payload: formValues,
      });
    });
  }
  // 重置
  handleReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState(this.getDefaultPagination());
  }
  // 页数变换处理函数
  handlePageChange = (pagination) => {
    const { query } = this.props;
    this.setState({ pagination });
    this.triggerRequestDelegate(params => query(params));
  }
  // 查询
  handleQuery = (e) => {
    if (e) e.preventDefault();
    const { query } = this.props;
    this.triggerRequestDelegate(params => query(params));
  }

  // 为表单查询字段提供封装方法
  wrapField = (field) => {
    const { getFieldDecorator } = this.props.form;
    const wrapField = {
      ...field,
      props: {
        ...field.props,
        getFieldDecorator,
        key: field.key,
      },
    };
    return wrapField;
  }

  // 所有触发了请求的委托方法统一入口
  triggerRequestDelegate = (callback) => {
    const { form } = this.props;
    const { pagination } = this.state;
    form.validateFields((err, fieldsValue) => {
      const params = {
        pageIndex: pagination.current,
        pageSize: pagination.pageSize,
        ...this.formatFieldsValue(fieldsValue),
      };
      callback(params);
    });
  }
  // 渲染
  render() {
    console.log(this.props);
    console.log(this.state);
    const {
      model: { data }, // 数据模型,约束位于文件夹/src/models下，需要在/src/commom/router.js注入
      columns, // 数据列组
      hiddenDefaultButtons, // 是否隐藏默认的查询、导出
      getFields, // 查询表单方法委托, 提供 this 参数
      // 提供TemplateCol模板,可省略FormItem,getFieldDecorator等，相当于简写版本
      // *此模板较简单，若查询表单情况复杂，可使用antd示例代码自行编写代码
      // api
      //   增加options={startDateOption}，为getFieldDecorator方法第二个参数
      title, // "浏览日志" 面包屑下方法标题
      getTools, // 工具栏方法, 提供 this 参数
      form, // antd注入的用于处理表单的对象，无需添加至table组件
      query, // 查询方法委托
      rowKey, // 数据行key, 若不提供则使用默认rowKey="id"
      autoQuery, // 是否打开页面自动加载数据
      ...rest // 其他参数，用于支持antd table组件的所有参数
    } = this.props;
    const { pagination } = this.state;
    const wrapTotalPagination = {
      ...pagination,
      total: data.total,
      showTotal: total => `总计 ${total} 行`,
      showQuickJumper: true,
    };
    const wrapProps = {
      ...rest,
      rowKey: rest.rowKey ? rest.rowKey : 'id',
      dataSource: data.rows, // 数据源
      columns: this.getWrapSeqColumns(),
      pagination: wrapTotalPagination,
      onChange: this.handlePageChange,
    };

    return (
      <PageHeaderLayout title={title} >
        <div className={styles.content}>
          <Form
            onSubmit={this.handleQuery}
            className={styles.form}
          >
            {
              !hiddenDefaultButtons ? this.getDefaultForm() : this.getCustomForm()
            }
          </Form>
          {
            getTools && (
              <div className={styles.tools}>
                <Row>
                  {
                    getTools(this)
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

TemplateQueryPage.TCol = TemplateCol;

export default TemplateQueryPage;
