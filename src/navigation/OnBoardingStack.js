import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ManualAccount, OnBoarding} from '../screens';
import MyDrawer from './DrawerNavigation';

const OnBoardingStack = createNativeStackNavigator();

export const OnBoardingStackScreens = () => {
  return (
    <OnBoardingStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="OnBoarding">
      <OnBoardingStack.Screen name="OnBoarding" component={OnBoarding} />
      <OnBoardingStack.Screen name="ManualAccount" component={ManualAccount} />
      <OnBoardingStack.Screen name="MyDrawer" component={MyDrawer} />
    </OnBoardingStack.Navigator>
  );
};
