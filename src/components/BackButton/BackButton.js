import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Images from '../../constants/Images';
import theme from '../../utils/theme';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';

const BackButton = ({tintColor}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      accessibilityLabel="back-navigation-button"
      onPress={() => navigation.goBack()}
      activeOpacity={theme.opacity}
      style={styles.arrow}>
      <Image
        source={Images.left}
        style={{...styles.back, tintColor: tintColor || theme.black}}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default BackButton;
