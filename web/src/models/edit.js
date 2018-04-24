
export default {
  namespace: 'edit',

  state: {
    title: '',
    visible: false,
    data: {},
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    saveData(state, action) {
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    },
    toggleVisible(state) {
      return {
        ...state,
        visible: !state.visible,
      };
    },
    saveTitle(state, action) {
      return {
        ...state,
        title: action.payload,
      };
    },
  },
};

