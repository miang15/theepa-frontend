import {ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import theme from '../../../utils/theme';
import CustomText from '../../../components/CustomText/CustomText';
import {useDispatch} from 'react-redux';
import {
  setAppLoading,
  setAppToast,
} from '../../../redux/AppLoader/appLoaderAction';
import http from '../../../config/http';
import {AUTH} from '../../../config/endpoint';
import {scaleFont} from '../../../utils/Layout';
import {margin} from '../../../utils/Layout';
import {CustomGradient, LabelInput} from '../../../components';
import analytics from '@react-native-firebase/analytics';

const PasswordSettings = ({navigation}) => {
  const [oldpass, setoldpass] = useState('');
  const [newpass, setnewpass] = useState('');
  const [confirmpass, setconfirmpass] = useState('');
  const [error, seterror] = useState({
    type: '',
    msg: '',
  });
  const dispatch = useDispatch();

  const handleUpdatePassword = async () => {
    try {
      seterror({type: '', msg: ''});
      if (!oldpass.toString().trim()) {
        seterror({type: 'oldpass', msg: 'Current password is Required'});
      } else if (!newpass.toString().trim()) {
        seterror({type: 'newpass', msg: 'New password is Required'});
      } else if (newpass.trim() !== confirmpass.trim()) {
        seterror({type: 'confirmpass', msg: 'Confirm password not matched'});
      } else {
        dispatch(setAppLoading(true));
        const checkpass = await http.post(AUTH.checkpass, {
          password: oldpass,
        });

        if (checkpass?.data?.success) {
          const changepass = await http.post(AUTH.changepass, {
            password: newpass,
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
            navigation.navigate('MyDrawer', {
              screen: 'TabBar',
              params: {
                screen: 'Home',
              },
            });
            await analytics().logEvent('update_password', {
              description: `update password`,
            });
          }
        } else {
          dispatch(
            setAppToast({
              title: 'Failed',
              description: 'Current Password is Incorrect',
              status: 'danger',
              showToast: true,
            }),
          );
        }
        return;
      }
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <AntDesign
        onPress={() => navigation.goBack()}
        name="left"
        size={24}
        color={theme.black}
        style={styles.back}
      />
      <CustomText
        style={{
          color: theme.primary,
          fontFamily: theme.sandbold,
          fontSize: scaleFont(20),
          ...margin(0, 0, 20, 20),
        }}>
        Change Password
      </CustomText>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LabelInput
          disabled={true}
          value={oldpass}
          label={'Current Password'}
          onChangeText={setoldpass}
          placeholder="Enter Current Password"
        />
        {error?.type == 'oldpass' ? (
          <CustomText textStyle={styles.error}>{error?.msg}</CustomText>
        ) : null}
        <LabelInput
          value={newpass}
          onChangeText={setnewpass}
          label={'New Password'}
          placeholder="Enter New Password"
          customView={{fontFamily: theme.sandregular}}
        />
        {error?.type == 'newpass' ? (
          <CustomText textStyle={styles.error}>{error?.msg}</CustomText>
        ) : null}
        <LabelInput
          value={confirmpass}
          onChangeText={setconfirmpass}
          label={'Confirm New Password'}
        />
        {error?.type == 'confirmpass' ? (
          <CustomText textStyle={styles.error}>{error?.msg}</CustomText>
        ) : null}
        <CustomGradient
          title="Update Password"
          customView={{...margin(20, 0, 0, 0)}}
          onPress={handleUpdatePassword}
        />
      </ScrollView>
    </View>
  );
};

export default PasswordSettings;
