import {View} from 'react-native';
import React from 'react';
import {SettingsItem} from '../../../components';
import Images from '../../../constants/Images';
import {styles} from './styles';
import {useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import theme from '../../../utils/theme';

const Settings = ({navigation}) => {
  const user = useSelector(state => state?.auth?.user);

  return (
    <View style={styles.container}>
      <AntDesign
        onPress={() => navigation.goBack()}
        name="left"
        size={24}
        color={theme.black}
        style={styles.back}
      />
      <SettingsItem
        onPress={() => navigation.navigate('ProfileSettings')}
        Icon={user?.profilepic ? {uri: user?.profilepic} : Images.user}
        tintColor={user?.profilepic ? null : theme.secondary}
        title={user?.name}
        desc={user?.email}
      />
      <SettingsItem
        onPress={() => navigation.navigate('PasswordSettings')}
        tintColor={theme.secondary}
        Icon={Images.lock}
        title={'Password'}
        desc={'Change password'}
      />
      <SettingsItem
        onPress={() => navigation.navigate('NotificationSetting')}
        tintColor={theme.secondary}
        Icon={Images.bell}
        title={'Notifications'}
        desc={'Configure your notifications'}
      />
    </View>
  );
};

export default Settings;
