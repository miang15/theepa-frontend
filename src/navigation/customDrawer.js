import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import React, {useEffect} from 'react';
import {View, Linking, StyleSheet, Image} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import theme from '../utils/theme';
import {useDispatch, useSelector} from 'react-redux';
import Images from '../constants/Images';
import CustomText from '../components/CustomText/CustomText';
import {
  margin,
  padding,
  scaleFont,
  scaleHeight,
  scaleSize,
} from '../utils/Layout';
import {clearLocalStorage, removeLocalStorage} from '../constants/functions';
import {CommonActions} from '@react-navigation/native';
import {STORAGE_KEYS} from '../config/endpoint';
import {resetState} from '../redux/AppLoader/appLoaderAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BackButton} from '../components';
import {white} from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';
import VersionCheck from 'react-native-version-check';

const CustomDrawerContent = ({...props}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state?.auth?.user);
  const version = VersionCheck.getCurrentVersion();

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
    props.navigation.reset({
      index: 0,
      routes: [{name: 'AuthStackScreens', params: {screen: 'Login'}}],
    });
  };

  useEffect(() => {
    props.navigation.addListener('blur', () => {
      props.navigation.toggleDrawer();
    });
  }, []);

  return (
    <DrawerContentScrollView
      style={{flex: 1}}
      {...props}
      contentContainerStyle={{
        paddingTop: 0,
        flex: 1,
        borderTopRightRadius: 20,
      }}>
      <View style={styles.row}>
        <BackButton tintColor={theme.white} />
        <View style={styles.row2}>
          <View
            style={{
              backgroundColor: 'white',
              width: scaleSize(40),
              height: scaleSize(40),
              borderRadius: scaleSize(30),
              overflow: 'hidden',
              padding: user?.profilepic ? 0 : 10,
            }}>
            <Image
              source={
                user?.profilepic ? {uri: user?.profilepic} : Images.usericon
              }
              resizeMode="cover"
              style={theme.img}
            />
          </View>
          <View
            style={{
              ...margin(0, 0, 0, 3),
              width: '100%',
              overflow: 'hidden',
            }}>
            <CustomText numberOfLines={2} textStyle={styles.name}>
              {user?.name}
            </CustomText>
            <CustomText numberOfLines={2} textStyle={styles.email}>
              {user?.email}
            </CustomText>
          </View>
        </View>
      </View>
      <View style={styles.optionview}>
        <Image source={Images.settingsicon} style={styles.optionicon} />

        <CustomText
          onPress={() => props.navigation.navigate('SettingStackScreens')}
          textStyle={styles.toplabel}>
          Settings
        </CustomText>
      </View>
      <View style={styles.optionview}>
        <Image source={Images.categoryicon} style={styles.optionicon} />
        <CustomText
          onPress={() => {
            props.navigation.navigate('TabBar', {
              screen: 'Home',
              params: {
                screen: 'CategoryStackScreens',
                params: {screen: 'AllCategory'},
              },
            });
          }}
          textStyle={styles.label}>
          Categories
        </CustomText>
      </View>
      <View style={styles.optionview}>
        <Image source={Images.bankicon} style={styles.optionicon} />
        <CustomText
          onPress={() => props.navigation.navigate('AllAccounts')}
          textStyle={styles.label}>
          Accounts
        </CustomText>
      </View>
      <View style={styles.optionview}>
        <Image source={Images.abouticon} style={styles.optionicon} />
        <CustomText
          onPress={() => Linking.openURL(`https://theepa.app/about-us/`)}
          textStyle={styles.label}>
          About
        </CustomText>
      </View>

      <View style={styles.optionview}>
        <Image source={Images.contacticon} style={styles.optionicon} />
        <CustomText
          onPress={() => Linking.openURL(`https://theepa.app/contact/`)}
          textStyle={styles.label}>
          Contact Us
        </CustomText>
      </View>
      <View style={styles.optionview}>
        <SimpleLineIcons
          name="logout"
          size={20}
          color={theme.secondary}
          style={[styles.optionicon]}
        />
        <CustomText onPress={handleLogout} textStyle={styles.label}>
          Log out
        </CustomText>
      </View>

      <CustomText textStyle={styles.version}>{`Version ${version}`}</CustomText>
      {/* <CustomText  textStyle={styles.contact}>
        Contact Us
      </CustomText> */}
    </DrawerContentScrollView>
  );
};
export default CustomDrawerContent;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'column',
    width: '100%',
    alignSelf: 'center',
    overflow: 'hidden',
    ...padding(5, 5, 5, 5),
    borderWidth: 1,
    borderColor: theme.skyblue,
    ...margin(0, 0, 0, 0),
    backgroundColor: theme.secondary,
    height: scaleHeight(210),
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    overflow: 'hidden',
    ...padding(0, 5, 5, 5),

    borderColor: theme.skyblue,
    ...margin(0, 0, 0, 0),
    position: 'absolute',
    bottom: scaleHeight(5),
  },
  imgview: {
    width: scaleSize(40),
    height: scaleSize(40),
    alignItems: 'center',
  },
  name: {
    fontFamily: theme.montsemibold,
    ...margin(0, 0, 0, 5),
    maxWidth: '80%',
    color: 'white',
    fontSize: 20,
  },
  toplabel: {
    ...margin(20, 0, 5, 10),
    color: theme.darkestgray,
    fontFamily: theme.sandsemibold,
  },
  label: {
    ...margin(20, 0, 5, 10),
    color: theme.darkestgray,
    fontFamily: theme.sandsemibold,
  },
  version: {
    ...margin(20, 0, 5, 10),
    color: theme.darkestgray,
    fontFamily: theme.sandlight,
    position: 'absolute',
    bottom: scaleHeight(10),
    fontSize: scaleFont(13),
  },
  contact: {
    ...margin(5, 0, 5, 15),
    color: theme.skyblue,
    fontFamily: theme.montbold,
    position: 'absolute',
    bottom: scaleHeight(20),
    textDecorationLine: 'underline',
  },
  optionview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionicon: {
    ...margin(20, 0, 5, 12),
  },
  email: {
    fontSize: scaleFont(13),
    color: theme.white,
    maxWidth: '80%',
  },
});
