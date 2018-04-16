import { stringify } from 'qs';
import request, { checkResponses } from '../utils/request';

export default {
  namespace: 'role',

  state: {
    data: {
      roles: [],
      authorities: {},
    },
  },

  effects: {
    *fetchRoles(_, { call, put }) {
      const response = yield call(queryRoles);
      yield put({
        type: 'saveRoles',
        payload: response.data,
      });
    },
    *fetchAuthorities({ payload, callback }, { call, put }) {
      const response = yield call(queryAuthorities, payload);
      yield put({
        type: 'saveAuthorities',
        payload: response,
      });
      checkResponses(response, callback);
    },
    *createRole({ payload, callback }, { call }) {
      const response = yield call(createRole, payload);
      checkResponses(response, callback);
    },
    *updateRole({ payload, callback }, { call }) {
      const response = yield call(updateRole, payload);
      checkResponses(response, callback);
    },
  },

  reducers: {
    saveRoles(state, action) {
      return {
        ...state,
        data: {
          roles: action.payload,
        },
      };
    },
    saveAuthorities(state, action) {
      return {
        ...state,
        data: {
          roles: state.data.roles,
          authorities: action.payload,
        },
      };
    },
  },
};

function queryRoles() {
  return request(`roles?${stringify({ enable: true })}`);
}
function queryAuthorities(params) {
  return request(`rolefunctionsV2/${params.roleId}`);
}
function createRole(params) {
  return request('rolefunctionsV2', { method: 'POST', body: { ...params } });
}
function updateRole(params) {
  return request(`rolefunctionsV2/${params.roleId}`, { method: 'PUT', body: { ...params } });
}
