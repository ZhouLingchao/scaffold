import { stringify } from 'qs';
import request from '../utils/request';

export default {
  namespace: 'common',

  state: {
    data: [],
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
  },
};

function getType(url) {
  return url.substring(url.lastIndexOf('/') + 1);
}
