import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import theme from '../../utils/theme';
import Feather from 'react-native-vector-icons/Feather';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';

const DrawerHeader = () => {
  const navigation = useNavigation();
  return (
    <Feather
      onPress={() => navigation.toggleDrawer()}
      name="menu"
      size={24}
      color={theme.black}
      style={styles.container}
    />
  );
};

export default DrawerHeader;
