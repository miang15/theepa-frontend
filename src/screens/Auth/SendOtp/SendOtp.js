import {View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import LogoText from '../../../components/LogoText/LogoText';
import CustomText from '../../../components/CustomText/CustomText';
import http from '../../../config/http';
import {AUTH, STORAGE_KEYS} from '../../../config/endpoint';
import {useDispatch} from 'react-redux';
import {
  setAppLoading,
  setAppToast,
} from '../../../redux/AppLoader/appLoaderAction';
import {BackButton, CustomGradient, LabelInput} from '../../../components';
import analytics from '@react-native-firebase/analytics';
import {setLocalStorage} from '../../../constants/functions';

const SendOtp = ({navigation}) => {
  const [email, setemail] = useState('');
  const [error, seterror] = useState({type: '', msg: ''});
  const dispatch = useDispatch();
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSendCode = async () => {
    seterror({type: '', msg: ''});

    if (!email.toString().trim()) {
      seterror({type: 'email', msg: 'Email is Required'});
    } else if (!email.toString().trim().match(emailRegex)) {
      seterror({type: 'email', msg: 'Please Enter valid Email'});
    } else {
      dispatch(setAppLoading(true));
      const sendCode = await http.post(AUTH.resetpass, {
        email,
      });
      dispatch(setAppLoading(false));
      if (sendCode?.data?.success) {
        await setLocalStorage(STORAGE_KEYS.RESET_EMAIL, email);
        dispatch(
          setAppToast({
            title: 'Success!!!',
            description: sendCode?.data?.data,
            status: 'success',
            showToast: true,
          }),
        );
        navigation.navigate('VerifyOTP');
        await analytics().logEvent('send_otp', {
          description: 'Reset password OTP send',
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <ScrollView showsVerticalScrollIndicator={false}>
        <LogoText logostyle={{marginTop: 30}} />

        <CustomText numberOfLines={1} textStyle={styles.socialemail}>
          Please enter your Email Address
        </CustomText>

        <LabelInput
          placeholder={'Enter your email'}
          value={email}
          onChangeText={setemail}
        />

        {error?.type == 'email' ? (
          <CustomText textStyle={styles.error}>{error?.msg}</CustomText>
        ) : null}

        <CustomGradient
          onPress={handleSendCode}
          title={'Send Code'}
          customView={{marginTop: 30}}
        />
      </ScrollView>
    </View>
  );
};

export default SendOtp;
