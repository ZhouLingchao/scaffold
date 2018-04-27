import { queryRoles, createRole, updateRole, queryAuths } from '../services/user';

export default {
  namespace: 'role',

  state: {
    roles: [],
    selectedRoleId: 0,
    auths: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryRoles);
      yield put({
        type: 'saveRoles',
        payload: response.data,
      });
    },
    *create({ payload, callback }, { call }) {
      yield call(createRole, payload);
      callback();
    },
    *update({ payload, callback }, { call }) {
      yield call(updateRole, payload);
      callback();
    },
    *fetchAuths({ payload }, { call, put }) {
      const response = yield call(queryAuths, payload);
      yield put({
        type: 'save',
        payload: {
          auths: response.data,
          selectedRoleId: payload.selectedRoleId,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    saveRoles(state, action) {
      return {
        ...state,
        roles: action.payload,
      };
    },
    saveAuths(state, { payload }) {
      return {
        ...state,
        auths: payload,
      };
    },
  },
};
