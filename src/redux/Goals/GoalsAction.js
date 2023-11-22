import * as RootNavigation from '../../navigation/RootNavigator';
import http from '../../config/http';
import {setAppLoading, setAppToast} from '../AppLoader/appLoaderAction';
import {BUDGET, CATEGORIES, DASHBOARD, GOALS} from '../../config/endpoint';
import {
  getDashboardAction,
  getWidgetsAction,
} from '../Dashboard/DashboardAction';
import {getProfileAction} from '../Auth/authAction';

export const GOALS_ACTION_TYPES = {
  SET_GOALS: 'SET_GOALS',
};

export const setGoal = payload => {
  return dispatch =>
    dispatch({
      type: GOALS_ACTION_TYPES.SET_GOALS,
      payload,
    });
};

export const getGoalsAction = payload => async dispatch => {
  try {
    const res = await http.get(GOALS.getGoals);

    if (res?.data?.success) {
      dispatch(setGoal(res?.data?.data?.budget.ActiveGoal));
    }
  } catch (error) {}
};

export const addGoalsAction = payload => async dispatch => {
  try {
    const res = await http.post(`${GOALS.addGoals}`, payload);

    if (res?.data?.success) {
      await Promise.all([
        dispatch(getGoalsAction()),
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

export const updateGoalsAction = (payload, id) => async dispatch => {
  try {
    const res = await http.put(`${GOALS.editGoals}${id}`, payload);

    if (res?.data?.success) {
      await Promise.all([
        dispatch(getGoalsAction()),
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

export const deleteGoalsAction = payload => async dispatch => {
  try {
    dispatch(setAppLoading(true));
    const res = await http.delete(`${GOALS.deleteGoals}${payload}`);

    if (res?.data?.success) {
      await Promise.all([
        dispatch(getGoalsAction()),
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
