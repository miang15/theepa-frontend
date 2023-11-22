import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './styles';
import CustomText from '../CustomText/CustomText';
import theme from '../../utils/theme';

const CustomGradient = ({
  onPress,
  disabled,
  title,
  gradientstyle,
  customView,
  titleColor,
}) => {
  return (
    <LinearGradient
      colors={theme.gradientcolors}
      start={theme.start}
      end={theme.end}
      style={[styles.topview, customView]}>
      <TouchableOpacity
        style={[styles.gradient, gradientstyle]}
        disabled={disabled}
        onPress={onPress}
        activeOpacity={0.8}>
        <CustomText
          numberOfLines={1}
          textStyle={{
            ...styles.title,
            color: titleColor ? titleColor : theme.white,
          }}>
          {title}
        </CustomText>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default CustomGradient;
