import React, { PureComponent } from 'react';
import { Form, Table } from 'antd';
import PageHeaderLayout from 'layouts/PageHeaderLayout';
import styles from './index.less';
import TemplateCol from './templateCol';
import DefaultQueryForm from './defaultQueryForm';
import CustomQueryForm from './customQueryForm';
import ToolBar from './toolbar';

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
    const { autoQuery, setRequery } = this.props;
    // 初始化查询
    if (autoQuery) {
      this.handleQuery();
    }
    // 将查询方法赋值给父组件
    if (setRequery) {
      setRequery(this.handleQuery);
    }
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
  // 页数变换处理函数
  handlePageChange = (pagination) => {
    const { query } = this.props;
    this.setState({ pagination });
    this.triggerRequestDelegate(params => query({
      ...params,
      pageIndex: pagination.current,
      pageSize: pagination.pageSize,
    }));
  }
  // 查询
  handleQuery = (e) => {
    if (e) e.preventDefault();
    const { query } = this.props;
    this.triggerRequestDelegate(params => query(params));
  }
  // 重置
  handleReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState(this.getDefaultPagination());
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
      exportConfig, // 用于导出excel，若该值为undefined 不显示导出按钮
      setRequery, // 将查询方法赋值给父组件
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
              !hiddenDefaultButtons ?
                (
                  <DefaultQueryForm
                    getFields={getFields}
                    handleReset={this.handleReset}
                    exportConfig={exportConfig}
                    handleExport={this.handleExport}
                    form={form}
                  />
                ) : (
                  <CustomQueryForm
                    getFields={getFields}
                    getFieldDecorator={form.getFieldDecorator}
                    component={this}
                  />
                )
            }
          </Form>
          {
            getTools && (
              <ToolBar
                component={this}
                getTools={getTools}
              />
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
