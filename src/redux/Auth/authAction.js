import * as RootNavigation from '../../navigation/RootNavigator';
import {Alert} from 'react-native';
import http from '../../config/http';
import {setAppLoading, setAppToast} from '../AppLoader/appLoaderAction';
import {store} from '../store';
import {AUTH, STORAGE_KEYS, USER} from '../../config/endpoint';
import {removeLocalStorage, setLocalStorage} from '../../constants/functions';
import {
  getAccountAction,
  getCategoryAction,
  getGoalsAction,
} from '../Dashboard/DashboardAction';
import {getCategoryIconsAction} from '../Category/CategoryAction';

export const AUTH_ACTION_TYPES = {
  SET_USER: 'SET_USER',
};

export const setUser = payload => {
  return dispatch =>
    dispatch({
      type: AUTH_ACTION_TYPES.SET_USER,
      payload,
    });
};

export const registerAction = payload => async dispatch => {
  try {
    const registerRes = await http.post(AUTH.signup, payload);
    if (registerRes?.data?.success) {
      setLocalStorage(
        STORAGE_KEYS.TOKEN,
        registerRes?.data?.data?.access_token,
      );
      setLocalStorage(
        STORAGE_KEYS.SIGNED_UP,
        registerRes?.data?.data?.access_token,
      );
      const now = new Date();
      setLocalStorage(STORAGE_KEYS.LASTSEEN, now.toString());
      dispatch(setUser(registerRes?.data?.data?.user?.user));
      dispatch(
        setAppToast({
          title: 'Success!!!',
          description: registerRes?.data?.data?.message,
          status: 'success',
          showToast: true,
        }),
      );
      await Promise.all([
        dispatch(getCategoryAction()),
        dispatch(getGoalsAction()),
        dispatch(getCategoryIconsAction()),
        dispatch(getAccountAction()),
        dispatch(getProfileAction()),
      ]);
      RootNavigation.replace('OnBoardingStackScreens');
    }
  } catch (error) {}
};

export const loginAction = payload => async dispatch => {
  try {
    const loginRes = await http.post(AUTH.signin, payload);
    if (loginRes?.data?.success) {
      const now = new Date();
      setLocalStorage(STORAGE_KEYS.LASTSEEN, now.toString());
      setLocalStorage(STORAGE_KEYS.TOKEN, loginRes?.data?.data?.access_token);
      setLocalStorage(
        STORAGE_KEYS.SIGNED_UP,
        loginRes?.data?.data?.access_token,
      );
      await Promise.all([
        dispatch(getCategoryAction()),
        dispatch(getGoalsAction()),
        dispatch(getCategoryIconsAction()),
        dispatch(getAccountAction()),
        dispatch(getProfileAction()),
      ]);
      RootNavigation.replace('MyDrawer');
    }
  } catch (error) {}
};

export const getProfileAction = payload => async dispatch => {
  try {
    const userRes = await http.get(USER.getprofile);
    if (userRes?.data?.success) {
      dispatch(setUser(userRes?.data?.data?.User?.userDetails));
    }
  } catch (error) {}
};

export const socialSignUpAction = payload => async dispatch => {
  try {
    const googleRes = await http.post(AUTH.socials, payload);

    if (googleRes?.data?.success) {
      setLocalStorage(STORAGE_KEYS.TOKEN, googleRes?.data?.data?.access_token);
      setLocalStorage(
        STORAGE_KEYS.SIGNED_UP,
        googleRes?.data?.data?.access_token,
      );
      const now = new Date();
      setLocalStorage(STORAGE_KEYS.LASTSEEN, now.toString());
      dispatch(setUser(googleRes?.data?.data?.user?.user));
      await Promise.all([
        dispatch(getCategoryAction()),
        dispatch(getGoalsAction()),
        dispatch(getCategoryIconsAction()),
        dispatch(getAccountAction()),
        dispatch(getProfileAction()),
      ]);
      return true;
    }
  } catch (error) {
    console.log(error, 'social sign up error');
  }
};

export const notificationAction = (url, payload) => async dispatch => {
  try {
    const Res = await http.put(url, payload);
    if (Res?.data?.success) {
      dispatch(getProfileAction());
    }
  } catch (error) {}
};

export const facebookAction = payload => async dispatch => {
  try {
    dispatch(setAppLoading(true));
    const facebookRes = await http.get(AUTH.facebook);
    if (facebookRes?.data?.success) {
      RootNavigation.navigate('CreatePassword');
    }
  } catch (error) {}
};

export const userUpdateAction = payload => async dispatch => {
  try {
    dispatch(setAppLoading(true));
    const res = await http.put(AUTH.update, payload);
    if (res?.data?.success) {
      dispatch(
        setAppToast({
          title: 'Success!!!',
          description: res?.data?.data?.message,
          status: 'success',
          showToast: true,
        }),
      );

      dispatch(getProfileAction());
    }
  } catch (error) {}
};
