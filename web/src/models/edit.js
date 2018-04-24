
export default {
  namespace: 'edit',

  state: {
    account: {
      value: 'test',
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

