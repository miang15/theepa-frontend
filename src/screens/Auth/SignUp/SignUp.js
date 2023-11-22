import {ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import theme from '../../../utils/theme';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
import {showMessage} from 'react-native-flash-message';
import {styles} from './styles';
import LogoText from '../../../components/LogoText/LogoText';
import CustomText from '../../../components/CustomText/CustomText';
import auth from '@react-native-firebase/auth';
import {setAppLoading} from '../../../redux/AppLoader/appLoaderAction';
import {useDispatch} from 'react-redux';
import {
  registerAction,
  socialSignUpAction,
} from '../../../redux/Auth/authAction';
import {
  CustomGradient,
  CustomSocialBtn,
  LabelInput,
  TermsConditions,
} from '../../../components';
import Images from '../../../constants/Images';
import {margin, scaleSize} from '../../../utils/Layout';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';

const SignUp = ({navigation}) => {
  const dispatch = useDispatch();
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [secureTextEntry, setsecureTextEntry] = useState(true);
  const [error, seterror] = useState({type: '', msg: ''});
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit = async () => {
    seterror({type: '', msg: ''});
    if (!name?.trim()) {
      seterror({type: 'name', msg: 'Name is Required'});
    } else if (name?.trim().length < 3) {
      seterror({type: 'name', msg: 'Name must be at least 3 characters long'});
    } else if (!email?.trim()) {
      seterror({type: 'email', msg: 'Email is Required'});
    } else if (!email?.trim().match(emailRegex)) {
      seterror({type: 'email', msg: 'Enter valid Email'});
    } else if (!password?.toString().trim()) {
      seterror({type: 'password', msg: 'Password is Required'});
    } else if (password?.toString().trim().length < 6) {
      seterror({
        type: 'password',
        msg: 'Password must be at least 6 characters long',
      });
    } else {
      const data = {
        name,
        email,
        password,
      };
      dispatch(setAppLoading(true));
      await dispatch(registerAction(data));
      dispatch(setAppLoading(false));
      await analytics().logSignUp({method: 'manual'});
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
      dispatch(setAppLoading(false));
      if (idToken) {
        const data = {
          email: user?.email,
          name: user?.name,
        };
        const result = await dispatch(socialSignUpAction(data));
        if (result) {
          navigation.replace('OnBoardingStackScreens');
          await analytics().logSignUp({method: 'google'});
        }
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

  const facebookLogin = async () => {
    try {
      dispatch(setAppLoading(true));
      LoginManager.logOut();
      const result = await LoginManager.logInWithPermissions(['email']);

      if (result?.isCancelled) {
        return showMessage({
          message: 'Failed',
          description: 'User cancelled the login process',
          type: 'danger',
          duration: 1500,
        });
      }

      AccessToken.getCurrentAccessToken()
        .then(data => {
          const accessToken = data.accessToken.toString();
          const request = new GraphRequest(
            '/me',
            {
              accessToken: accessToken,
              parameters: {
                fields: {
                  string: 'email,name',
                },
              },
            },
            (error, result) => {
              if (error) {
                return showMessage({
                  message: 'Error',
                  description: 'Error fetching user email',
                  type: 'danger',
                  duration: 1500,
                });
              } else {
                const data = {
                  email: result?.email,
                  name: result?.name,
                };
                if (!accessToken) {
                  return showMessage({
                    message: 'Error',
                    description: 'Something went wrong obtaining access token',
                    type: 'danger',
                    duration: 1500,
                  });
                }

                const facebookCredential =
                  auth.FacebookAuthProvider.credential(accessToken);

                auth().signInWithCredential(facebookCredential);
                navigation.navigate('CreatePassword', {socialData: data});
              }
            },
          );
          new GraphRequestManager().addRequest(request).start();
        })
        .catch(e => {
          dispatch(setAppLoading(true));
          return showMessage({
            message: 'Error',
            description: 'Something went wrong obtaining access token',
            type: 'danger',
            duration: 1500,
          });
        });
    } catch (error) {
      dispatch(setAppLoading(true));
      console.log('error', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LogoText />
        <CustomText textStyle={styles.signuptext}>
          Create an account or sign in
        </CustomText>
        <LabelInput
          label={'Name'}
          placeholder={'Enter your name'}
          value={name}
          onChangeText={setname}
          disabled={true}
          customView={styles.namefield}
        />
        {error?.type == 'name' ? (
          <CustomText textStyle={styles.error}>{error?.msg}</CustomText>
        ) : null}
        <LabelInput
          label={'Email'}
          placeholder={'Enter email'}
          value={email}
          onChangeText={setemail}
          disabled={true}
          customView={styles.emailfield}
        />
        {error?.type == 'email' ? (
          <CustomText textStyle={styles.error}>{error?.msg}</CustomText>
        ) : null}
        <LabelInput
          label={'Password'}
          placeholder={'Enter a new password'}
          value={password}
          onChangeText={setpassword}
          Icon={Images.eyeIcon}
          tintColor={secureTextEntry ? theme.lightgrey : theme.secondary}
          onIcon={() => setsecureTextEntry(!secureTextEntry)}
          secureTextEntry={secureTextEntry}
          disabled={true}
          customView={styles.passwordfield}
        />
        {error?.type == 'password' ? (
          <CustomText textStyle={styles.error}>{error?.msg}</CustomText>
        ) : null}
        <CustomGradient
          onPress={handleSubmit}
          title={'Create Account'}
          customView={styles.createaccbtn}
        />
        <CustomText textStyle={styles.signin}>
          {`Already have an account? `}
          <CustomText
            onPress={() => navigation.navigate('Login')}
            textStyle={styles.manual}>
            SignIn
          </CustomText>
        </CustomText>
        <View style={styles.bottom}>
          <View style={styles.line} />
          <CustomText textStyle={{...margin(0, 10, 5, 10), fontSize: 18}}>
            or
          </CustomText>
          <View style={styles.line} />
        </View>

        <CustomSocialBtn
          title={'Continue with Google'}
          imgsrc={Images.googleicon}
          onPress={googleSignIn}
          customImgstyle={{height: scaleSize(18), width: scaleSize(18)}}
        />
        <TermsConditions />
        {/* <CustomSocialBtn
          title={'Continue with Facebook'}
          imgsrc={Images.facebookicon}
          onPress={facebookLogin}
          customImgstyle={{height: scaleSize(23), width: scaleSize(15)}}
        /> */}
      </ScrollView>
    </View>
  );
};

export default SignUp;
