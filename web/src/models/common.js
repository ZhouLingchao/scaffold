import { stringify } from 'qs';
import request from '../utils/request';

export default {
  namespace: 'common',

  state: {
    data: {},
    enums: {},
  },

  effects: {
    *fetch({ required, payload }, { call, put }) {
      const response = yield call(() => request(`/api/${required.url}?${stringify(payload)}`));
      yield put({
        type: 'save',
        payload: response,
        url: required.url,
      });
    },
    *fetchEnums({ payload }, { call, put }) {
      const response = yield call(() => request(`/enums?${stringify(payload)}`));
      yield put({
        type: 'saveEnums',
        payload: {
          data: response.data,
          key: payload.name,
        },
      });
    },
  },

  reducers: {
    save(state, action) {
      const type = getType(action.url);
      const data = {
        ...state.data,
        [type]: action.payload,
      };
      return {
        ...state,
        data,
      };
    },
    saveEnums(state, action) {
      const { payload } = action;
      return {
        ...state,
        enums: {
          ...state.enums,
          [payload.key]: payload.data,
        },
      };
    },
  },
};

function getType(url) {
  return url.substring(url.lastIndexOf('/') + 1);
}
