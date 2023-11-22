import {ScrollView, View} from 'react-native';
import React, {useState} from 'react';
import theme from '../../../utils/theme';
import BackHeader from '../../../components/BackHeader/BackHeader';
import CustomInput from '../../../components/CustomInput/CustomInput';
import CustomButton from '../../../components/CustomButton/CustomButton';
import {styles} from './styles';
import LogoText from '../../../components/LogoText/LogoText';
import CustomText from '../../../components/CustomText/CustomText';
import {registerAction} from '../../../redux/Auth/authAction';
import {useDispatch} from 'react-redux';

const ManualSignUp = ({navigation}) => {
  const dispatch = useDispatch();
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState({type: '', msg: ''});
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit = async () => {
    seterror({type: '', msg: ''});
    if (!name) {
      seterror({type: 'name', msg: 'Name is Required'});
    } else if (name?.length < 3) {
      seterror({type: 'name', msg: 'Name must be at least 3 characters long'});
    } else if (!email) {
      seterror({type: 'email', msg: 'Email is Required'});
    } else if (!email.match(emailRegex)) {
      seterror({type: 'email', msg: 'Enter valid Email'});
    } else if (!password) {
      seterror({type: 'password', msg: 'Password is Required'});
    } else if (password?.length < 6) {
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
      dispatch(registerAction(data));
    }
  };

  return (
    <View style={styles.container}>
      <BackHeader title={'Back'} onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <LogoText />
        <CustomInput
          label={'Name'}
          customStyle={{marginTop: theme.hp('10%')}}
          value={name}
          onChangeText={setname}
        />
        {error?.type == 'name' ? (
          <CustomText textStyle={styles.error}>{error?.msg}</CustomText>
        ) : null}
        <CustomInput label={'Email'} value={email} onChangeText={setemail} />
        {error?.type == 'email' ? (
          <CustomText textStyle={styles.error}>{error?.msg}</CustomText>
        ) : null}
        <CustomInput
          label={'Password'}
          value={password}
          onChangeText={setpassword}
        />
        {error?.type == 'password' ? (
          <CustomText textStyle={styles.error}>{error?.msg}</CustomText>
        ) : null}
        <CustomButton
          onPress={handleSubmit}
          customLabelStyle={{color: theme.black}}
          title={'Sign Up'}
          customStyle={styles.signUp}
        />
        <CustomText textStyle={styles.signin}>
          {`Already have an account? `}
          <CustomText
            onPress={() => navigation.navigate('Login')}
            textStyle={styles.manual}>
            SignIn
          </CustomText>
        </CustomText>
      </ScrollView>
    </View>
  );
};

export default ManualSignUp;
