import {StatusBar, Linking, View} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {styles} from './styles';
import LogoText from '../../../components/LogoText/LogoText';
import {
  clearLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '../../../constants/functions';
import {STORAGE_KEYS} from '../../../config/endpoint';
import * as RootNavigation from '../../../navigation/RootNavigator';
import {useDispatch} from 'react-redux';
import {getProfileAction} from '../../../redux/Auth/authAction';
import {
  addAllRegexAction,
  getAllRegexAction,
  setAllRegex,
} from '../../../redux/SMSParsing/SMSParsingAction';
import {BankRegex} from '../../../DummyData/DummyData';
import {resetState} from '../../../redux/AppLoader/appLoaderAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getAccountAction,
  getCategoryAction,
  getGoalsAction,
} from '../../../redux/Dashboard/DashboardAction';
import {getCategoryIconsAction} from '../../../redux/Category/CategoryAction';
import CustomText from '../../../components/CustomText/CustomText';
import theme from '../../../utils/theme';
import LinearGradient from 'react-native-linear-gradient';
import {AllRegex} from '../../../DummyData/AllRegex';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';
import http from '../../../config/http';
import VersionNumber from 'react-native-version-number';
import VersionCheck from 'react-native-version-check';
import {Modal, Portal} from 'react-native-paper';
import {
  CustomGradient,
  HeadingCross,
  TermsConditions,
} from '../../../components';

const Splash = () => {
  const dispatch = useDispatch();
  const [show, setshow] = useState(false);

  const handleSession = async () => {
    setTimeout(() => {
      checkSession();
    }, 3000);
    syncRegularExpression();
  };

  const handleLatestVersion = async () => {
    try {
      const skipupdate = await getLocalStorage(STORAGE_KEYS.SKIP_UPDATE);
      if (skipupdate) {
        handleSession();
      } else {
        VersionCheck.needUpdate()
          .then(async res => {
            if (res?.isNeeded) {
              setshow(true);
            } else {
              handleSession();
            }
          })
          .catch(e => {
            console.log('e', e);
            handleSession();
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleLatestVersion();
  }, []);

  const checkSession = async () => {
    try {
      await analytics().logAppOpen();
      const signedUp = await getLocalStorage(STORAGE_KEYS.SIGNED_UP);
      if (signedUp) {
        const loggedIn = await getLocalStorage(STORAGE_KEYS.TOKEN);

        if (loggedIn) {
          const lastseen = await getLocalStorage(STORAGE_KEYS.LASTSEEN);
          const now = new Date();
          const loginDate = new Date(lastseen);
          if (now.getDate() > loginDate.getDate()) {
            handleLogout();
          } else {
            const onboarding = await getLocalStorage(
              STORAGE_KEYS.ONBOARDING_PAGE,
            );
            if (onboarding == 'createpassword') {
              return RootNavigation.replace('SignUp');
            }
            await Promise.all([
              dispatch(getCategoryIconsAction()),
              dispatch(getAccountAction()),
              dispatch(getProfileAction()),
            ]);
            if (onboarding == 'onboarding') {
              RootNavigation.replace('OnBoardingStackScreens', {
                screen: 'OnBoarding',
              });
            } else if (onboarding == 'ManualAccount') {
              RootNavigation.replace('ManualAccount', {manualflow: 'Yes'});
            } else {
              await Promise.all([
                dispatch(getCategoryAction()),
                dispatch(getGoalsAction()),
              ]);
              RootNavigation.replace('MyDrawer');
            }
          }
        } else {
          RootNavigation.replace('Login');
        }
      } else {
        RootNavigation.replace('SignUp');
      }
    } catch (error) {
      console.log('check session', error);
    }
  };

  const handleLogout = async () => {
    const allKeys = await AsyncStorage.getAllKeys();
    const keysToRemove = allKeys.filter(key => {
      if (
        key.toLocaleLowerCase() !==
          STORAGE_KEYS.EXTRA_SMS.toLocaleLowerCase() &&
        key.toLocaleLowerCase() !==
          STORAGE_KEYS.LATEST_SYNCED_TIME.toLocaleLowerCase() &&
        key.toLocaleLowerCase() !== STORAGE_KEYS.ALL_REGEX.toLocaleLowerCase()
      ) {
        return true;
      }
    });
    await AsyncStorage.multiRemove(keysToRemove);
    dispatch(resetState());
    RootNavigation.replace('Login');
  };

  const syncRegularExpression = async () => {
    try {
      await removeLocalStorage(STORAGE_KEYS.ALL_REGEX);
      const allRegex = await getLocalStorage(STORAGE_KEYS.ALL_REGEX);
      const parseData = JSON.parse(allRegex);
      // parseData?.forEach(async item => {
      //   const deleteRes = await http.delete(`sms/delete-regex/${item?._id}`);
      //   console.log('delete', deleteRes?.data);
      // });
      // return;
      if (parseData?.length) {
        await dispatch(setAllRegex(parseData));
      } else {
        await dispatch(getAllRegexAction());
        // AllRegex?.forEach(item => {
        //   dispatch(addAllRegexAction(item));
        // });
      }
    } catch (error) {
      console.log('sync regular expression: ', error);
    }
  };

  return (
    <Fragment>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />
      <LinearGradient
        colors={theme.gradientcolors}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        style={styles.container}>
        <LogoText logostyle={styles.logo} />
        <CustomText textStyle={styles.theepa}>Theepa</CustomText>
        <TermsConditions
          customDesc={styles.description}
          customTerms={styles.terms}
        />
      </LinearGradient>
      <Portal>
        <Modal
          visible={show}
          onDismiss={async () => {
            setshow(false);
            await setLocalStorage(STORAGE_KEYS.SKIP_UPDATE, 'YES');
            handleSession();
          }}
          contentContainerStyle={styles.modal}>
          <HeadingCross
            label={'Update Required'}
            onCross={async () => {
              setshow(false);
              await setLocalStorage(STORAGE_KEYS.SKIP_UPDATE, 'YES');
              handleSession();
            }}
            customrow={styles.cross}
          />
          <CustomText textStyle={styles.desc}>
            You are using an old version of this app, Please upgrade your app to
            continue with latest features.
          </CustomText>
          <CustomGradient
            title={'Update'}
            onPress={async () => {
              setshow(false);
              await removeLocalStorage(STORAGE_KEYS.SKIP_UPDATE);
              Linking.openURL(
                `https://play.google.com/store/apps/details?id=com.approcket.theepa`,
              );
            }}
          />
        </Modal>
      </Portal>
    </Fragment>
  );
};

export default Splash;
