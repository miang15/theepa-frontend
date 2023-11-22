import {createDrawerNavigator} from '@react-navigation/drawer';

import CustomDrawerContent from './customDrawer';
import TabBar from './BottomTabNavigator';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          width: '65%',
          overflow: 'hidden',
        },
        headerShown: false,
      }}
      initialRouteName="TabBar">
      <Drawer.Screen name="TabBar" component={TabBar} />
    </Drawer.Navigator>
  );
};
export default MyDrawer;
