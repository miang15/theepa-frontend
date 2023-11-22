import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './styles';
import CustomText from '../CustomText/CustomText';
import theme from '../../utils/theme';
import {margin, scaleSize} from '../../utils/Layout';

const CustomGradientIncomeExpense = ({
  onPress,
  disabled,
  title,
  gradientstyle,
  customView,
  titleColor,
  imgsrc,
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
        <Image
          source={imgsrc}
          style={{
            width: scaleSize(15),
            height: scaleSize(15),
            ...margin(0, 10, 0, 0),
          }}
          resizeMode="cover"
        />

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

export default CustomGradientIncomeExpense;
