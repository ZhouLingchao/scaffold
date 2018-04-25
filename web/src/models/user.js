import { routerRedux } from 'dva/router';
import decode from 'jwt-decode';
import { query as queryUsers, createUser, updateUser } from '../services/user';
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
    *create({ payload, callback }, { call }) {
      yield call(createUser, payload);
      callback();
    },
    *update({ payload, callback }, { call }) {
      yield call(updateUser, payload);
      callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload.data,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
  },
};
