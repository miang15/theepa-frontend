import {APP_LOADER_ACTION_TYPES} from './appLoaderAction';

const initialState = {
  loading: false,
  showSplash: true,
  toast: {
    showToast: false,
    title: '',
    description: '',
    status: 'success',
  },
  progress: 0,
};

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case APP_LOADER_ACTION_TYPES.APP_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case APP_LOADER_ACTION_TYPES.SHOW_SPLASH:
      return {
        ...state,
        showSplash: action.payload,
      };
    case APP_LOADER_ACTION_TYPES.APP_TOAST:
      return {
        ...state,
        toast: {...action.payload},
      };
    case APP_LOADER_ACTION_TYPES.SET_PROGRESS:
      return {
        ...state,
        progress: action.payload,
      };
    default:
      return state;
  }
};

export default loadingReducer;
