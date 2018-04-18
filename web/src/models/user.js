import { routerRedux } from 'dva/router';
import { message } from 'antd';
import decode from 'jwt-decode';
import { query as queryUsers, queryCurrent, queryMenus } from '../services/user';
import { getMenuData } from '../common/menu';
import request, { checkResponses } from '../utils/request';
import { getToken } from '../utils/token';

export default {
  namespace: 'user',

  state: {
    data: [],
    currentUser: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryUsers, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrentUser(_, { put }) {
      const token = getToken();
      if (token) {
        yield put({
          type: 'saveCurrentUser',
          payload: decode(token),
        });
      } else {
        yield put(routerRedux.push('/user/login'));
      }
    },
    *Add({ payload, callback }, { call, put }) {
      const response = yield call(goadd, payload);
      yield put({
        type: 'res',
        payload: response,
      });
      if (callback) {
        if (response && response.error) {
          message.error(response.message);
        } else {
          callback(response);
        }
      }
    },
    *Edit({ payload, callback }, { call, put }) {
      const response = yield call(goedit, payload);
      yield put({
        type: 'res',
        payload: response,
      });
      if (callback) {
        if (response && response.error) {
          message.error(response.message);
        } else {
          callback(response);
        }
      }
    },
    *enableUser({ payload, callback }, { call, put }) {
      const response = yield call(goenable, payload);
      yield put({
        type: 'res',
        payload: response,
      });
      if (callback) {
        if (response && response.error) {
          message.error(response.message);
        } else {
          callback(response);
        }
      }
    },
    *disableUser({ payload, callback }, { call, put }) {
      const response = yield call(godisable, payload);
      yield put({
        type: 'res',
        payload: response,
      });
      if (callback) {
        if (response && response.error) {
          message.error(response.message);
        } else {
          callback(response);
        }
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
    saveMenus(state, action) {
      const menuRolesMap = new Map();
      action.payload.forEach((menu) => {
        menuRolesMap.set(menu.url, menu.roles);
      });
      const wrapMenus = [];
      getMenuData().forEach(menu => formatMenus(menuRolesMap, wrapMenus, menu));
      return {
        ...state,
        menus: wrapMenus,
      };
    },
  },
};

function formatMenus(menuRolesMap, wrapMenus, menu) {
  const newMenu = { ...menu };
  if (menuRolesMap.has(menu.path)) {
    newMenu.authority = menuRolesMap.get(menu.path);
  } else {
    newMenu.authority = 'unset';
  }
  if (menu.children) {
    newMenu.children = [];
    menu.children.forEach(child => formatMenus(menuRolesMap, newMenu.children, child));
  }
  wrapMenus.push(newMenu);
}


// 新增
function goadd(params) {
  return request(`api/Users`, { method: 'POST', body: { ...params } }, false);
}

// 修改
function goedit(params) {
  return request(`api/Users/${params.id}`, { method: 'PUT', body: { ...params } }, false);
}

// 获取账号
function getAccount() {
  return request('/api/UserAccounts');
}
