import { queryChart } from '../services/chart';

export default {
  namespace: 'chart',

  state: {
    data: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryChart);
      yield put({
        type: 'save',
        payload: response.data,
      });
    }
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        data: payload,
      };
    },
  },
};

