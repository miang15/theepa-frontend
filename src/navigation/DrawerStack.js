import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  NotificationSetting,
  PasswordSettings,
  ProfileSettings,
  Settings,
} from '../screens';

const SettingStack = createNativeStackNavigator();

export const SettingStackScreens = () => {
  return (
    <SettingStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Settings">
      <SettingStack.Screen name="Settings" component={Settings} />
      <SettingStack.Screen
        name="NotificationSetting"
        component={NotificationSetting}
      />
      <SettingStack.Screen name="ProfileSettings" component={ProfileSettings} />
      <SettingStack.Screen
        name="PasswordSettings"
        component={PasswordSettings}
      />
    </SettingStack.Navigator>
  );
};
