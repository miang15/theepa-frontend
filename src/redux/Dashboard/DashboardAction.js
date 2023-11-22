import * as RootNavigation from '../../navigation/RootNavigator';
import {Alert} from 'react-native';
import http from '../../config/http';
import {setAppLoading, setAppToast} from '../AppLoader/appLoaderAction';
import {store} from '../store';
import {
  ACCOUNT,
  AUTH,
  DASHBOARD,
  ONBOARDING,
  STORAGE_KEYS,
  USER,
} from '../../config/endpoint';
import {removeLocalStorage, setLocalStorage} from '../../constants/functions';
import {getProfileAction} from '../Auth/authAction';

export const DASHBOARD_ACTION_TYPES = {
  SET_CATEGORY: 'SET_CATEGORY',
  SET_DASHBOARD_DATA: 'SET_DASHBOARD_DATA',
  SET_ACCOUNTS: 'SET_ACCOUNTS',
  SET_GOALS: 'SET_GOALS',
  SET_ALL_WIDGETS: 'SET_ALL_WIDGETS',
  UPDATE_ACCOUNT: 'UPDATE_ACCOUNT',
};

export const setCategory = payload => {
  return dispatch =>
    dispatch({
      type: DASHBOARD_ACTION_TYPES.SET_CATEGORY,
      payload,
    });
};

export const updateAccount = payload => {
  return dispatch =>
    dispatch({
      type: DASHBOARD_ACTION_TYPES.UPDATE_ACCOUNT,
      payload,
    });
};

export const setAllWidgets = payload => {
  return dispatch =>
    dispatch({
      type: DASHBOARD_ACTION_TYPES.SET_ALL_WIDGETS,
      payload,
    });
};

export const setAccounts = payload => {
  return dispatch =>
    dispatch({
      type: DASHBOARD_ACTION_TYPES.SET_ACCOUNTS,
      payload,
    });
};

export const setMyGoals = payload => {
  return dispatch =>
    dispatch({
      type: DASHBOARD_ACTION_TYPES.SET_GOALS,
      payload,
    });
};

export const setDashboardData = payload => {
  return dispatch =>
    dispatch({
      type: DASHBOARD_ACTION_TYPES.SET_DASHBOARD_DATA,
      payload,
    });
};

export const getCategoryAction = payload => async dispatch => {
  try {
    const allCategoriesRes = await http.get(ONBOARDING.getCategories);
    if (allCategoriesRes?.data?.success) {
      const categories =
        allCategoriesRes?.data?.data?.categories?.categoriesWithBudgets;
      dispatch(setCategory(categories));
    }
  } catch (error) {}
};

export const getDashboardAction = url => async dispatch => {
  try {
    const dashboardRes = await http.get(
      url !== undefined && url !== null ? url : DASHBOARD.getDashboardData,
    );

    if (dashboardRes?.data?.success) {
      dispatch(setDashboardData(dashboardRes?.data?.data?.DashboardData));
    }
  } catch (error) {}
};

export const getWidgetsAction = () => async dispatch => {
  try {
    const dashboardRes = await http.get(DASHBOARD.getAllWidgets);
    if (dashboardRes?.data?.success) {
      dispatch(setAllWidgets(dashboardRes?.data?.data?.cardsdata));
    }
  } catch (error) {}
};

export const addAccountAction = payload => async dispatch => {
  try {
    const accountRes = await http.post(ACCOUNT.addaccount, payload);

    if (accountRes?.data?.success) {
      dispatch(
        setAppToast({
          title: 'Success!!!',
          description: accountRes?.data?.data?.message,
          status: 'success',
          showToast: true,
        }),
      );
      dispatch(getProfileAction());
      dispatch(getAccountAction());
      dispatch(getDashboardAction());
      return true;
    }
  } catch (error) {}
};

export const getAccountAction = () => async dispatch => {
  try {
    const accountRes = await http.get(ACCOUNT.getAccount);
    if (accountRes?.data?.success) {
      dispatch(setAccounts(accountRes?.data?.data?.budget));
    }
  } catch (error) {}
};

export const editAccountAction = (payload, id) => async dispatch => {
  try {
    const accountRes = await http.put(`${ACCOUNT.editAccount}/${id}`, payload);
    if (accountRes?.data?.success) {
      dispatch(getAccountAction());
      return true;
    }
  } catch (error) {}
};

export const deleteAccountAction = id => async dispatch => {
  try {
    dispatch(setAppLoading(true));
    const deleteRes = await http.delete(`${ACCOUNT.deleteAccount}/${id}`);
    dispatch(setAppLoading(false));
    if (deleteRes?.data?.success) {
      dispatch(getProfileAction());
      dispatch(getAccountAction());
      dispatch(getDashboardAction());
    }
  } catch (error) {}
};

export const primaryAccountAction = (payload, id) => async dispatch => {
  try {
    const accountRes = await http.put(`${ACCOUNT.setPrimary}/${id}`, payload);
    if (accountRes?.data?.success) {
      dispatch(getAccountAction());
    }
  } catch (error) {}
};

export const getGoalsAction = () => async dispatch => {
  try {
    const allgoals = await http.get(ONBOARDING.getallGoals);
    if (allgoals?.data?.success) {
      const mygoals = allgoals?.data?.data?.budget?.ActiveGoal;
      dispatch(setMyGoals(mygoals));
    }
  } catch (error) {}
};

export const addWidgetAction = payload => async dispatch => {
  try {
    const addwidgetres = await http.post(DASHBOARD.addWidgets, payload);

    if (addwidgetres?.data?.success) {
      dispatch(getProfileAction());
      dispatch(getWidgetsAction());
      dispatch(getDashboardAction());

      dispatch(
        setAppToast({
          title: 'Success!!!',
          description: addwidgetres?.data?.data?.message,
          status: 'success',
          showToast: true,
        }),
      );
    }
  } catch (error) {}
};

export const removeWidgetAction = payload => async dispatch => {
  try {
    dispatch(setAppLoading(true));
    const removewidgetres = await http.put(DASHBOARD.removeWidgets, payload);

    if (removewidgetres?.data?.success) {
      dispatch(getProfileAction());
      dispatch(getWidgetsAction());
      dispatch(getDashboardAction());
      dispatch(
        setAppToast({
          title: 'Success!!!',
          description: removewidgetres?.data?.data?.message,
          status: 'success',
          showToast: true,
        }),
      );
    }
  } catch (error) {}
};
