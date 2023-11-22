import {View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import LogoText from '../../../components/LogoText/LogoText';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import CustomText from '../../../components/CustomText/CustomText';
import analytics from '@react-native-firebase/analytics';

import {useDispatch} from 'react-redux';
import {
  setAppLoading,
  setAppToast,
} from '../../../redux/AppLoader/appLoaderAction';
import http from '../../../config/http';
import {AUTH} from '../../../config/endpoint';
import {BackButton, CustomGradient} from '../../../components';
import {margin} from '../../../utils/Layout';

const VerifyOTP = ({navigation}) => {
  const [code, setcode] = useState('');
  const dispatch = useDispatch();

  const handleOTPVerify = async () => {
    try {
      if (code?.length < 6) {
        dispatch(
          setAppToast({
            title: 'Error',
            description: 'OTP must be 6 digit',
            status: 'danger',
            showToast: true,
          }),
        );
      } else {
        dispatch(setAppLoading(true));
        const verifyRes = await http.post(`${AUTH.confirmotp}?otp=${code}`);
        dispatch(setAppLoading(false));
        if (verifyRes?.data?.success) {
          dispatch(
            setAppToast({
              title: 'Success',
              description: 'OTP Verified',
              status: 'success',
              showToast: true,
            }),
          );
          await analytics().logEvent('verify_otp', {
            description: 'OTP verification',
          });
          navigation.replace('CreatePassword', {forgot: 'yes'});
        }
      }
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <ScrollView showsVerticalScrollIndicator={false}>
        <LogoText />

        <CustomText numberOfLines={2} textStyle={styles.socialemail}>
          {`Please enter the verification code ${'\n'}received in your email`}
        </CustomText>

        <OTPInputView
          style={styles.otpcontainer}
          pinCount={6}
          placeholderCharacter="*"
          autoFocusOnLoad={false}
          codeInputFieldStyle={styles.box}
          codeInputHighlightStyle={styles.highLighted}
          onCodeFilled={code => {
            setcode(code);
          }}
        />

        <CustomGradient
          title={'Verify'}
          onPress={handleOTPVerify}
          customView={{...margin(40, 0, 0, 0)}}
        />
      </ScrollView>
    </View>
  );
};

export default VerifyOTP;
