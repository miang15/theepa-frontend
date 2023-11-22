import * as RootNavigation from '../../navigation/RootNavigator';
import http from '../../config/http';
import {setAppLoading, setAppToast} from '../AppLoader/appLoaderAction';
import {BUDGET, CATEGORIES, DASHBOARD} from '../../config/endpoint';
import {
  getDashboardAction,
  getWidgetsAction,
} from '../Dashboard/DashboardAction';

export const BUDGET_ACTION_TYPES = {
  SET_BUDGET: 'SET_BUDGET',
};

export const setBudget = payload => {
  return dispatch =>
    dispatch({
      type: BUDGET_ACTION_TYPES.SET_BUDGET,
      payload,
    });
};

export const getBudgetAction = payload => async dispatch => {
  try {
    const res = await http.get(BUDGET.getBudgets);
    if (res?.data?.success) {
      dispatch(setBudget(res?.data?.data?.budget.UserBudget));
    }
  } catch (error) {}
};

export const addBudgetAction = (payload, id) => async dispatch => {
  try {
    const res = await http.post(`${BUDGET.addBudget}${id}`, payload);

    if (res?.data?.success) {
      await Promise.all([
        dispatch(getBudgetAction()),
        dispatch(getDashboardAction()),
        dispatch(getWidgetsAction()),
      ]);
      setTimeout(() => {
        dispatch(
          setAppToast({
            title: 'Success!!!',
            description: res?.data?.data?.message,
            status: 'success',
            showToast: true,
          }),
        );
      }, 1000);
      RootNavigation.goBack();
    }
  } catch (error) {}
};

export const updateBudgetAction = (payload, id) => async dispatch => {
  try {
    const res = await http.put(`${BUDGET.editBudget}${id}`, payload);

    if (res?.data?.success) {
      await Promise.all([
        dispatch(getBudgetAction()),
        dispatch(getDashboardAction()),
        dispatch(getWidgetsAction()),
      ]);

      setTimeout(() => {
        dispatch(
          setAppToast({
            title: 'Success!!!',
            description: res?.data?.data?.message,
            status: 'success',
            showToast: true,
          }),
        );
      }, 1000);
      RootNavigation.goBack();
    }
  } catch (error) {}
};

export const deleteBudgetAction = payload => async dispatch => {
  try {
    dispatch(setAppLoading(true));
    const res = await http.delete(`${BUDGET.deleteBudget}${payload}`);

    if (res?.data?.success) {
      await Promise.all([
        dispatch(getBudgetAction()),
        dispatch(getDashboardAction()),
        dispatch(getWidgetsAction()),
      ]);
      dispatch(setAppLoading(false));
      setTimeout(() => {
        dispatch(
          setAppToast({
            title: 'Success!!!',
            description: res?.data?.data?.message,
            status: 'success',
            showToast: true,
          }),
        );
        RootNavigation.goBack();
      }, 1000);
    }
  } catch (error) {}
};
