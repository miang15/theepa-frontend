import {Image, TouchableOpacity, Dimensions, View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import theme from '../../utils/theme';
import Images from '../../constants/Images';
import CustomText from '../CustomText/CustomText';

const CustomCategory = ({
  onPress,
  Icon,
  customContainer,
  boxStyle,
  Category,
  emoji,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={theme.opacity}
      style={[styles.container, customContainer]}>
      {Icon ? (
        <View style={styles.imgView}>
          <Image source={Icon} resizeMode="contain" style={styles.img} />
        </View>
      ) : (
        <CustomText style={styles.emoji}>{emoji}</CustomText>
      )}
      {Category ? (
        <CustomText textStyle={styles.name} numberOfLines={1}>
          {Category}
        </CustomText>
      ) : null}
    </TouchableOpacity>
  );
};

export default CustomCategory;
