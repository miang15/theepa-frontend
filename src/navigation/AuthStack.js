import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CreatePassword,
  Login,
  ManualSignUp,
  SendOtp,
  SignUp,
  Splash,
  VerifyOTP,
} from '../screens';
import MyDrawer from './DrawerNavigation';

const AuthStack = createNativeStackNavigator();

export const AuthStackScreens = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash">
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
      <AuthStack.Screen name="CreatePassword" component={CreatePassword} />
      <AuthStack.Screen name="SendOtp" component={SendOtp} />
      <AuthStack.Screen name="VerifyOTP" component={VerifyOTP} />
      <AuthStack.Screen name="ManualSignUp" component={ManualSignUp} />
      <AuthStack.Screen name="Splash" component={Splash} />
      <AuthStack.Screen name="MyDrawer" component={MyDrawer} />
    </AuthStack.Navigator>
  );
};
