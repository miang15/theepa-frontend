import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import theme from '../../../utils/theme';
import CustomText from '../../../components/CustomText/CustomText';
import {ToggleLabel} from '../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {notificationAction} from '../../../redux/Auth/authAction';
import {USER} from '../../../config/endpoint';
import analytics from '@react-native-firebase/analytics';

const NotificationSetting = ({navigation}) => {
  const user = useSelector(state => state?.auth?.user);
  const [muteall, setmuteall] = useState(false);
  const [mutebudgetgoals, setmutebudgetgoals] = useState(false);
  const [mutetransaction, setmutetransaction] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setmuteall(user?.MuteNotifications);
      setmutebudgetgoals(user?.BudgetndGoalsNotification);
      setmutetransaction(user?.UnCategorizedTransactionNotifications);
    }
  }, [user]);

  const handleNotifications = async (url, val) => {
    dispatch(notificationAction(url, {MuteNotifications: val}));
    if (url == USER.muteall && val) {
      dispatch(
        notificationAction(USER.mutebudgetgoals, {MuteNotifications: false}),
      );
      dispatch(
        notificationAction(USER.mutetransaction, {MuteNotifications: false}),
      );
    }
    await analytics().logEvent('notification_setting', {
      description: `update notification setting`,
    });
  };

  return (
    <View style={styles.container}>
      <AntDesign
        onPress={() => navigation.goBack()}
        name="left"
        size={20}
        color={theme.black}
        style={styles.back}
      />
      <CustomText textStyle={styles.heading}>Notification Settings</CustomText>
      <ToggleLabel
        label={'Mute all notifications'}
        sync={muteall}
        onToggle={val => {
          setmuteall(val);
          handleNotifications(USER.muteall, val);
        }}
      />
      <ToggleLabel
        disabled={muteall}
        label={'Mute Budget and goal notifications'}
        sync={mutebudgetgoals}
        onToggle={val => {
          setmutebudgetgoals(val);
          handleNotifications(USER.mutebudgetgoals, val);
        }}
      />
      <ToggleLabel
        disabled={muteall}
        label={'Mute Uncategorized transaction notifications'}
        sync={mutetransaction}
        onToggle={val => {
          setmutetransaction(val);
          handleNotifications(USER.mutetransaction, val);
        }}
      />
    </View>
  );
};

export default NotificationSetting;
