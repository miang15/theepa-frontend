import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import theme from '../utils/theme';
import {BudgetsPage, Dashboard, GoalsPage, History, Reports} from '../screens';
import {
  BudgetStackScreens,
  DashboardStackScreens,
  GoalsStackScreens,
} from './DashboardStack';

const Tab = createBottomTabNavigator();

const TabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.secondary,
        tabBarInactiveTintColor: theme.black,
        tabBarActiveBackgroundColor: '#F9F9F9',
        // tabBarInactiveBackgroundColor: 'grey',
        headerShown: false,
        tabBarShowLabel: true,
        tabBarIcon: null,
        tabBarHideOnKeyboard: true,
      }}
      initialRouteName="Home">
      <Tab.Screen
        options={{
          tabBarIcon: ({focused, color}) => (
            <FontAwesome5 name="history" size={18} color={color} />
          ),
          tabBarLabel: 'History',
        }}
        name="History"
        component={History}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Reports',
          tabBarIcon: ({focused, color}) => (
            <Ionicons name="documents-outline" size={18} color={color} />
          ),
        }}
        name="Reports"
        component={Reports}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused, color}) => (
            <AntDesign name="home" size={15} color={color} />
          ),
          tabBarLabel: 'Home',
        }}
        name="Home"
        component={DashboardStackScreens}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Goals',
          tabBarIcon: ({focused, color}) => (
            <Entypo name="hair-cross" size={18} color={color} />
          ),
        }}
        name="GoalsStackScreens"
        component={GoalsStackScreens}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Budgets',
          tabBarIcon: ({focused, color}) => (
            <FontAwesome5 name="money-bill-alt" size={15} color={color} />
          ),
        }}
        name="BudgetStackScreens"
        component={BudgetStackScreens}
      />
    </Tab.Navigator>
  );
};
export default TabBar;
