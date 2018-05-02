import mockjs from 'mockjs';
import moment from 'moment';
import { getRule, postRule } from './mock/rule';
import { getActivities, getNotice, getFakeList } from './mock/api';
import { getFakeChartData } from './mock/chart';
import { imgMap, getUrlParams } from './mock/utils';
import { getProfileBasicData } from './mock/profile';
import { getProfileAdvancedData } from './mock/profile';
import { getNotices } from './mock/notices';
import { format, delay } from 'roadhog-api-doc';
import { getLogs } from './mock/log';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    $desc: "获取当前用户接口",
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      notifyCount: 12,
    },
  },
  'POST /api/tokens': {
    code: 200,
    message: '',
    data: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxNTZlN2RkNi1hZjQ3LTRjN2QtOTRiMy0zMzQ2ODU4NzYyZTQiLCJpc3MiOiJnd3QuYXBpIiwiaWF0IjoiMjAxOC80LzE2IDI6MTE6MjEiLCJuYmYiOjE1MjM4NDQ2ODEsImV4cCI6MTUyMzg0ODI4MSwiYXVkIjoiZ3d0LndlYiIsImF1dGgiOlsibWFuYWdlL3VzZXIiLCJtYW5hZ2Uvcm9sZSIsImNoYXJ0L3RlbXBlcmF0dXJlIl0sIm5hbWUiOiJ0eXpob3UifQ.8xtGyrktM1df3KOoPzgmSEN7t6AaLb4ZqIPzzqftnhE',
  },
  // GET POST 可省略
  'GET /api/users': (req, res) => {
    const total = 50;
    const rows = [];
    const params = getUrlParams(req.url);
    for (let i = 0; i < 10; i++) {
      rows.push({
        id: i,
        code: `000${i}`,
        realName: `name${(params.pageIndex || 1 - 1) * (params.pageSize || 10) + i}`,
        roleName: '所有权限',
        roleId: '1',
        eMail: '522548789@qq.com',
        mobile: '13777349985',
        accountStatus: '正常',
      });
    }
    return res.json({
      code: 200,
      data: {
        total,
        rows,
      }
    });
  },
  'POST /api/users': {
    code: 200,
  },
  'PUT /api/users': {
    code: 200,
  },
  'GET /api/enums': {
    code: 200,
    data: [{
      value: 200,
      text: '正常',
    }, {
      value: 500,
      text: '异常',
    }],
  },
  'GET /api/roles': {
    code: 200,
    data: [{
      id: 1,
      name: '所有权限',
    }]
  },
  'GET /api/roleFunctions': {
    code: 200,
    data: [
      'manage/user',
      'manage/role',
      'chart/temperature',
    ],
  },
  'GET /api/charts': (req, res) => {
    const now = moment();
    const data = [];
    for (let i = 0; i < 20; i += 1) {
      data.push({
        time: now.add(30, 's').format('HH:mm:ss'),
        value: 10 + (i % 2 ==0 ? i+1:i-1),
      });
    }
    return res.json({
      code: 200,
      data,
    });
  },
  'GET /api/project/notice': getNotice,
  'GET /api/activities': getActivities,
  'GET /api/rule': getRule,
  'POST /api/rule': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postRule,
  },
  'POST /api/forms': (req, res) => {
    res.send({ message: 'Ok' });
  },
  'GET /api/fake_list': getFakeList,
  'GET /api/fake_chart_data': getFakeChartData,
  'GET /api/profile/basic': getProfileBasicData,
  'GET /api/profile/advanced': getProfileAdvancedData,
  'POST /api/login/account': (req, res) => {
    const { password, mobile, type } = req.body;
    if (password === '888888' && mobile === '13711111111') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin'
      });
      return;
    }
    if (password === '123456' && userName === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user'
      });
      return;
    }
    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest'
    });
  },
  'POST /api/register': (req, res) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
  'GET /api/notices': getNotices,
  'GET /api/500': (req, res) => {
    res.status(500).send({
      "timestamp": 1513932555104,
      "status": 500,
      "error": "error",
      "message": "error",
      "path": "/base/category/list"
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      "timestamp": 1513932643431,
      "status": 404,
      "error": "Not Found",
      "message": "No message available",
      "path": "/base/category/list/2121212"
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      "timestamp": 1513932555104,
      "status": 403,
      "error": "Unauthorized",
      "message": "Unauthorized",
      "path": "/base/category/list"
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      "timestamp": 1513932555104,
      "status": 401,
      "error": "Unauthorized",
      "message": "Unauthorized",
      "path": "/base/category/list"
    });
  },
  'GET /api/logs': getLogs,
  'GET /api/logs/export': { url: 'http://localhost:12000/test.csv' },

};

export default noProxy ? {} : delay(proxy, 1000);
