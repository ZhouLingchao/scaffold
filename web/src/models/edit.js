
export default {
  namespace: 'edit',

  state: {
    title: '',
    visible: false,
    data: {},
    loading: false,
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
    toggleLoading(state) {
      return {
        ...state,
        loading: !state.loading,
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

