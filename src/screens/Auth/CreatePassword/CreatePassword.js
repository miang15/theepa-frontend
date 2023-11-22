import {View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import LogoText from '../../../components/LogoText/LogoText';
import theme from '../../../utils/theme';
import CustomText from '../../../components/CustomText/CustomText';
import http from '../../../config/http';
import {AUTH, STORAGE_KEYS} from '../../../config/endpoint';
import {useDispatch} from 'react-redux';
import {
  setAppLoading,
  setAppToast,
} from '../../../redux/AppLoader/appLoaderAction';
import {BackButton, CustomGradient, LabelInput} from '../../../components';
import {margin} from '../../../utils/Layout';
import {getLocalStorage, setLocalStorage} from '../../../constants/functions';
import {socialSignUpAction} from '../../../redux/Auth/authAction';
import Images from '../../../constants/Images';
import analytics from '@react-native-firebase/analytics';

const CreatePassword = ({navigation}) => {
  const [password, setpassword] = useState('');
  const [secureTextEntry, setsecureTextEntry] = useState(true);
  const [error, seterror] = useState({type: '', msg: ''});
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    seterror({type: '', msg: ''});

    if (!password.toString().trim()) {
      seterror({type: 'password', msg: 'Password is Required'});
    } else if (password?.length < 6) {
      seterror({
        type: 'password',
        msg: 'Password must be at least 6 characters long',
      });
    } else {
      dispatch(setAppLoading(true));

      const mail = await getLocalStorage(STORAGE_KEYS.RESET_EMAIL);
      const changepass = await http.put(AUTH.changepass, {
        email: mail,
        password,
      });
      if (changepass?.data?.success) {
        dispatch(
          setAppToast({
            title: 'Success',
            description: changepass?.data?.data,
            status: 'success',
            showToast: true,
          }),
        );
        navigation.replace('AuthStackScreens', {screen: 'Login'});
      }
    }
    await analytics().logEvent('reset_password', {
      description: 'Reset password',
    });
    dispatch(setAppLoading(false));
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <ScrollView showsVerticalScrollIndicator={false}>
        <LogoText />

        <CustomText numberOfLines={1} textStyle={styles.socialemail}>
          Please Create Login Password
        </CustomText>

        <LabelInput
          placeholder={'New Password'}
          value={password}
          onChangeText={setpassword}
          Icon={Images.eyeIcon}
          tintColor={secureTextEntry ? theme.lightgrey : theme.secondary}
          onIcon={() => setsecureTextEntry(!secureTextEntry)}
          secureTextEntry={secureTextEntry}
        />

        {error?.type == 'password' ? (
          <CustomText textStyle={styles.error}>{error?.msg}</CustomText>
        ) : null}

        <CustomGradient
          title={'Submit'}
          onPress={handleSubmit}
          customView={{...margin(30, 0, 0, 0)}}
        />
      </ScrollView>
    </View>
  );
};

export default CreatePassword;
