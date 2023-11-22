import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../CustomText/CustomText';
import {scaleHeight, scaleWidth} from '../../utils/Layout';
import theme from '../../utils/theme';
import {styles} from './styles';
import LinearGradient from 'react-native-linear-gradient';

const CustomProgress = ({
  customContainer,
  alert,
  label,
  onPress,
  value,
  progress,
}) => {
  const gradientColors = theme.gradientcolors;
  const alertThreshold = 0.8; // Set the threshold value for the alert color

  let colors = gradientColors;
  if (progress > alertThreshold && alert) {
    colors = theme.alertgradient;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={theme.opacity}
      style={[styles.centerview, customContainer]}>
      <View style={styles.row2}>
        <CustomText textStyle={styles.income} numberOfLines={1}>
          {label}
        </CustomText>
        <CustomText textStyle={styles.incomevalue} numberOfLines={1}>
          {value}
        </CustomText>
      </View>
      <View style={styles.progress}>
        <View style={{width: `${progress * 100}%`, height: '100%'}}>
          <LinearGradient
            colors={colors}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{flex: 1, borderColor: theme.secondarylight}}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomProgress;
