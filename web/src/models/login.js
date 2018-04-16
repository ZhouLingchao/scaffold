import { routerRedux } from 'dva/router';
import { accountLogin, sendVerifyCode, resetPassword } from '../services/login';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import { setToken } from '../utils/token';
import { checkResponses } from '../utils/request';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    resetStatus: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);
      // Login successfully
      if (!response.error) {
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
        reloadAuthorized();
        yield put(routerRedux.push('/'));
      }
    },
    *logout(_, { put, select }) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
      }
    },
    *send({ callback, payload }, { call }) {
      const response = yield call(sendVerifyCode, {
        ...payload,
        template: 0,
      });
      checkResponses(response, callback);
    },
    *reset({ payload }, { call, put }) {
      const response = yield call(resetPassword, payload);
      yield put({
        type: 'changeResetStatue',
        payload: response,
      });
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      const { data, error } = payload;
      setToken(data);
      return {
        ...state,
        status: error ? 'error' : 'ok',
        type: 'account',
      };
    },
    changeResetStatue(state, { payload }) {
      return {
        ...state,
        resetStatus: payload.error ? 'error' : 'ok',
        type: 'account',
      };
    },
    changeTab(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    }
  },
};
