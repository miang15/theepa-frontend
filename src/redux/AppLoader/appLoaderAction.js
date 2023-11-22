export const APP_LOADER_ACTION_TYPES = {
  APP_LOADING: 'APP_LOADING',
  APP_TOAST: 'APP_TOAST',
  SHOW_SPLASH: 'SHOW_SPLASH',
  RESET_STATE: 'RESET_STATE',
  SET_PROGRESS: 'SET_PROGRESS',
};

export const resetState = () => ({
  type: APP_LOADER_ACTION_TYPES.RESET_STATE,
});

export const setAppLoading = payload => {
  return dispatch => {
    return dispatch({
      type: APP_LOADER_ACTION_TYPES.APP_LOADING,
      payload,
    });
  };
};

export const setAppProgress = payload => {
  return dispatch => {
    return dispatch({
      type: APP_LOADER_ACTION_TYPES.SET_PROGRESS,
      payload,
    });
  };
};

export const hideSplashAction = payload => {
  return dispatch => {
    return dispatch({
      type: APP_LOADER_ACTION_TYPES.SHOW_SPLASH,
      payload,
    });
  };
};

export const setAppToast = payload => {
  return dispatch => {
    return dispatch({
      type: APP_LOADER_ACTION_TYPES.APP_TOAST,
      payload,
    });
  };
};
