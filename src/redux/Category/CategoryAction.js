import * as RootNavigation from '../../navigation/RootNavigator';
import http from '../../config/http';
import {setAppLoading, setAppToast} from '../AppLoader/appLoaderAction';
import {CATEGORIES, DASHBOARD} from '../../config/endpoint';
import {getDashboardAction} from '../Dashboard/DashboardAction';

export const CATEGORY_ACTION_TYPES = {
  SET_CATEGORY: 'SET_CATEGORY',
  SET_CATEGORY_ICONS: 'SET_CATEGORY_ICONS',
};

export const setCategory = payload => {
  return dispatch =>
    dispatch({
      type: CATEGORY_ACTION_TYPES.SET_CATEGORY,
      payload,
    });
};

export const setCategoryIcons = payload => {
  return dispatch =>
    dispatch({
      type: CATEGORY_ACTION_TYPES.SET_CATEGORY_ICONS,
      payload,
    });
};

export const deleteCategoryAction = payload => async dispatch => {
  try {
    dispatch(setAppLoading(true));
    const removecategory = await http.delete(
      `${CATEGORIES.deletecategory}/${payload}`,
    );

    if (removecategory?.data?.success) {
      dispatch(
        setAppToast({
          title: 'Success!!!',
          description: removecategory?.data?.data?.message,
          status: 'success',
          showToast: true,
        }),
      );
      dispatch(getDashboardAction());
      RootNavigation.goBack();
    }
    dispatch(setAppLoading(false));
  } catch (error) {}
};

export const getCategoryIconsAction = payload => async dispatch => {
  try {
    const res = await http.get(CATEGORIES.getCategoryIcons);
    if (res?.data?.length) {
      dispatch(setCategoryIcons(res?.data));
    }
  } catch (error) {}
};

export const updateCategoryAction = payload => async dispatch => {
  try {
    const updatecategory = await http.put(
      `${CATEGORIES.updatecategory}/${payload?.id}`,
      {name: payload?.name},
    );
    if (updatecategory?.data?.success) {
      dispatch(getDashboardAction());
    }
  } catch (error) {}
};
