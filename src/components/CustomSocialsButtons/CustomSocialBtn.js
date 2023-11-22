import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './styles';
import CustomText from '../CustomText/CustomText';
import theme from '../../utils/theme';
import Images from '../../constants/Images';
import {scaleSize} from '../../utils/Layout';

const CustomSocialBtn = ({
  onPress,
  disabled,
  title,
  gradientstyle,
  customView,
  customImgstyle,
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
        {imgsrc ? (
          <Image source={imgsrc} style={customImgstyle} resizeMode="cover" />
        ) : null}
        <CustomText
          numberOfLines={1}
          textStyle={{
            ...styles.title,
            color: titleColor ? titleColor : theme.primary,
          }}>
          {title}
        </CustomText>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default CustomSocialBtn;
