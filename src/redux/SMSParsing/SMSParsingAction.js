import * as RootNavigation from '../../navigation/RootNavigator';
import http from '../../config/http';
import {setAppLoading, setAppToast} from '../AppLoader/appLoaderAction';
import {REGEX, STORAGE_KEYS} from '../../config/endpoint';
import {removeLocalStorage, setLocalStorage} from '../../constants/functions';

export const SMS_ACTION_TYPES = {
  SET_All_REGEX: 'SET_All_REGEX',
  SET_All_SMS: 'SET_All_SMS',
  SET_UNCATEGORIZED_TRANSACTIONS: 'SET_UNCATEGORIZED_TRANSACTIONS',
};

export const setAllRegex = payload => {
  return dispatch =>
    dispatch({
      type: SMS_ACTION_TYPES.SET_All_REGEX,
      payload,
    });
};

export const setUncategorizedTransactions = payload => {
  return dispatch =>
    dispatch({
      type: SMS_ACTION_TYPES.SET_UNCATEGORIZED_TRANSACTIONS,
      payload,
    });
};

export const setAllBankSms = payload => {
  return dispatch =>
    dispatch({
      type: SMS_ACTION_TYPES.SET_All_SMS,
      payload,
    });
};

export const getAllRegexAction = payload => async dispatch => {
  try {
    const res = await http.get(REGEX.getRegex);
    if (res?.data?.success) {
      const data = res?.data?.data?.sms_regex_template?.BanksRegex;
      await setLocalStorage(STORAGE_KEYS.ALL_REGEX, JSON.stringify(data));
      dispatch(setAllRegex(data));
    }
  } catch (error) {}
};

export const addAllRegexAction = payload => async dispatch => {
  try {
    const res = await http.post(REGEX.addRegex, payload);
    if (res?.data?.success) {
      dispatch(getAllRegexAction());
    }
  } catch (error) {}
};

export const deleteAllRegexAction = payload => async dispatch => {
  try {
    dispatch(setAppLoading(true));
    const res = await http.post(`${REGEX.deleteRegex}/${payload}`);
    if (res?.data?.success) {
      removeLocalStorage(STORAGE_KEYS.ALL_REGEX);
      dispatch(getAllRegexAction());
    }
  } catch (error) {}
};
