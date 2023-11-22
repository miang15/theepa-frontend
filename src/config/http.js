import axios from 'axios';
import {store} from '../redux/store';
import {
  resetState,
  setAppLoading,
  setAppToast,
} from '../redux/AppLoader/appLoaderAction';
import {getLocalStorage, removeLocalStorage} from '../constants/functions';
import {STORAGE_KEYS} from './endpoint';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import {navigationRef} from '../navigation/RootNavigator';

// export const BASE_URL = `http://3.67.67.172/`;
// export const BASE_URL = `https://theepa.app/`;
export const BASE_URL = `https://api.theepa.app/`;

const http = axios.create({
  baseURL: BASE_URL,
});
http.interceptors.request.use(
  async config => {
    //token
    if (config?.url == 'profile/edit-profile') {
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    const token = (await getLocalStorage(STORAGE_KEYS.TOKEN)) || '';
    config.headers.Cookie = `access_token ${token}`;
    return config;
  },
  err => Promise.reject(err),
);

const ResponseInterceptor = response => {
  return response;
};

const handleLogout = async () => {
  const allKeys = await AsyncStorage.getAllKeys();
  const keysToRemove = allKeys.filter(key => {
    if (
      key.toLocaleLowerCase() !== STORAGE_KEYS.EXTRA_SMS.toLocaleLowerCase() &&
      key.toLocaleLowerCase() !==
        STORAGE_KEYS.LATEST_SYNCED_TIME.toLocaleLowerCase() &&
      key.toLocaleLowerCase() !== STORAGE_KEYS.ALL_REGEX.toLocaleLowerCase()
    ) {
      return true;
    }
  });
  await AsyncStorage.multiRemove(keysToRemove);
  store.dispatch(resetState());
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: 'AuthStackScreens', // Name of your stack navigator
          state: {
            routes: [
              {
                name: 'Login', // Name of the screen within the stack navigator
              },
            ],
          },
        },
      ],
    }),
  );
};

http.interceptors.response.use(ResponseInterceptor, err => {
  const error = err?.response?.data || err;
  if (err?.response?.status === 401) {
    removeLocalStorage(STORAGE_KEYS.TOKEN);
    handleLogout();
    store.dispatch(
      setAppToast({
        title: 'Error',
        description: 'Your session expire please login again',
        status: 'danger',
        showToast: true,
      }),
    );
    return;
  }
  console.log('error:', error);
  if (err?.response?.config?.url == 'unmatchedsms/add-unmatchedsms') {
    console.log('ignore');
  } else {
    store.dispatch(setAppLoading(false));
    store.dispatch(
      setAppToast({
        title: 'Error',
        description: error?.message,
        status: 'danger',
        showToast: true,
      }),
    );
  }

  return err;
});

export default http;
