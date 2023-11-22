import {View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import LogoText from '../../../components/LogoText/LogoText';
import theme from '../../../utils/theme';
import {useRoute} from '@react-navigation/native';
import CustomText from '../../../components/CustomText/CustomText';
import {loginAction} from '../../../redux/Auth/authAction';
import {useDispatch} from 'react-redux';
import {
  CustomGradient,
  CustomSocialBtn,
  LabelInput,
  TermsConditions,
} from '../../../components';
import Images from '../../../constants/Images';
import {scaleSize, margin, scaleWidth} from '../../../utils/Layout';
import {setAppLoading} from '../../../redux/AppLoader/appLoaderAction';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';

const Login = ({navigation}) => {
  const route = useRoute();
  const dispatch = useDispatch();
  const [email, setemail] = useState('');
  const [secureTextEntry, setsecureTextEntry] = useState(true);
  const [password, setpassword] = useState('');
  const [error, seterror] = useState({type: '', msg: ''});
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit = async () => {
    seterror({type: '', msg: ''});
    if (!email.toString().trim()) {
      seterror({type: 'email', msg: 'Email is Required'});
    } else if (!email.toString().trim().match(emailRegex)) {
      seterror({type: 'email', msg: 'Enter valid Email'});
    } else if (!password.toString().trim()) {
      seterror({type: 'password', msg: 'Password is Required'});
    } else {
      const data = {
        email,
        password,
      };
      dispatch(setAppLoading(true));
      await dispatch(loginAction(data));
      dispatch(setAppLoading(false));
      await analytics().logLogin({method: email});
    }
  };

  const googleSignIn = async () => {
    try {
      dispatch(setAppLoading(true));
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) await GoogleSignin.signOut();

      const {idToken, user} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      auth().signInWithCredential(googleCredential);
      if (idToken) {
        const data = {
          email: user?.email,
        };
        await dispatch(loginAction(data));
        dispatch(setAppLoading(false));
        await analytics().logLogin({method: 'google'});
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('sign in cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        showMessage({
          message: 'Status',
          description: 'Sign in already in progress',
          type: 'info',
          duration: 1500,
        });
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        showMessage({
          message: 'Failed',
          description: 'Google Play services not available',
          type: 'danger',
          duration: 1500,
        });
      } else {
        showMessage({
          message: 'Error',
          description: 'Something went wrong',
          type: 'danger',
          duration: 1500,
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LogoText logostyle={{marginTop: 40}} />
        <LabelInput
          label={'Email'}
          placeholder={'Enter email'}
          customView={styles.emailfield}
          value={email}
          onChangeText={setemail}
          disabled={true}
        />
        {error?.type == 'email' ? (
          <CustomText textStyle={styles.error}>{error?.msg}</CustomText>
        ) : null}
        <LabelInput
          label={'Password'}
          placeholder={'Enter a new password'}
          disabled={true}
          value={password}
          onChangeText={setpassword}
          Icon={Images.eyeIcon}
          tintColor={secureTextEntry ? theme.lightgrey : theme.secondary}
          onIcon={() => setsecureTextEntry(!secureTextEntry)}
          secureTextEntry={secureTextEntry}
          customView={styles.passwordfield}
        />
        {error?.type == 'password' ? (
          <CustomText textStyle={styles.error}>{error?.msg}</CustomText>
        ) : null}

        <CustomGradient
          title={'Login'}
          customView={{width: scaleSize(325), marginTop: 20}}
          onPress={handleSubmit}
        />
        <CustomSocialBtn
          title={'Continue with Google'}
          imgsrc={Images.googleicon}
          onPress={googleSignIn}
          customView={{width: scaleWidth(325), ...margin(10, 0, 10, 0)}}
          customImgstyle={{height: scaleSize(18), width: scaleSize(18)}}
        />
        <CustomText
          onPress={() => navigation.navigate('SendOtp')}
          textStyle={styles.forgotpassword}>
          Forgot Password?
        </CustomText>

        <CustomText textStyle={styles.signin}>
          {`Don't have an account? `}
          <CustomText
            onPress={() => navigation.navigate('SignUp')}
            textStyle={styles.manual}>
            SignUp
          </CustomText>
        </CustomText>
        <TermsConditions />
      </ScrollView>
    </View>
  );
};

export default Login;
