import {StyleSheet} from 'react-native';
import React, {useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackScreens} from './AuthStack';
import {navigationRef} from './RootNavigator';
import {OnBoardingStackScreens} from './OnBoardingStack';
import {DashboardStackScreens} from './DashboardStack';
import MyDrawer from './DrawerNavigation';
import {
  AllAccounts,
  ManualAccount,
  SyncAccount,
  SyncLoading,
  SyncedAccount,
} from '../screens';
import {SettingStackScreens} from './DrawerStack';
import analytics from '@react-native-firebase/analytics';

const MainStack = () => {
  const Stack = createNativeStackNavigator();
  const routeNameRef = useRef();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName;
      }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="AuthStackScreens">
        <Stack.Screen name="AuthStackScreens" component={AuthStackScreens} />
        <Stack.Screen name="MyDrawer" component={MyDrawer} />
        <Stack.Screen name="ManualAccount" component={ManualAccount} />
        <Stack.Screen name="AllAccounts" component={AllAccounts} />
        <Stack.Screen name="SyncAccount" component={SyncAccount} />
        <Stack.Screen name="SyncedAccount" component={SyncedAccount} />
        <Stack.Screen name="SyncLoading" component={SyncLoading} />
        <Stack.Screen
          name="SettingStackScreens"
          component={SettingStackScreens}
        />

        <Stack.Screen
          name="OnBoardingStackScreens"
          component={OnBoardingStackScreens}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
