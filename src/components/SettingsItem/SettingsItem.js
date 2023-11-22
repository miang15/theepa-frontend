import {TouchableOpacity, View, Image, Text} from 'react-native';
import React from 'react';
import {styles} from './styles';
import Images from '../../constants/Images';
import CustomText from '../CustomText/CustomText';
import theme from '../../utils/theme';

const SettingsItem = ({customStyle, tintColor, onPress, Icon, title, desc}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={theme.opacity}
      style={[styles.row, customStyle]}>
      <View style={styles.imgview}>
        {Icon ? (
          <Image
            style={[theme.img, {tintColor: tintColor ? tintColor : null}]}
            source={Icon}
            resizeMode="contain"
          />
        ) : null}
      </View>
      <View style={styles.column}>
        <CustomText numberOfLines={1} textStyle={styles.label}>
          {title}
        </CustomText>
        <CustomText numberOfLines={1}>{desc}</CustomText>
      </View>
    </TouchableOpacity>
  );
};

export default SettingsItem;
