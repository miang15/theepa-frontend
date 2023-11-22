import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import crashlytics from '@react-native-firebase/crashlytics';
import MainStack from './src/navigation/MainStack';
import theme from './src/utils/theme';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import FlashMessage from 'react-native-flash-message';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {CustomToast, Loader} from './src/components';
import codePush from 'react-native-code-push';
import {MenuProvider} from 'react-native-popup-menu';

let CodePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
};

const App = () => {
  GoogleSignin.configure({
    webClientId:
      '818533872740-o0cb1s0tvslomo3v7vokv2l754pdn0dl.apps.googleusercontent.com',
  });

  useEffect(() => {
    crashlytics().log('App JS');
  }, []);

  return (
    <Provider store={store}>
      <MenuProvider>
        <PaperProvider>
          <StatusBar backgroundColor={theme.white} barStyle={'dark-content'} />
          <CustomToast />
          <Loader />
          <FlashMessage position="top" />
          <MainStack />
        </PaperProvider>
      </MenuProvider>
    </Provider>
  );
};

export default App;
// export default codePush(CodePushOptions)(App);
