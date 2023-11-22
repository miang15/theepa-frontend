import {Image, View} from 'react-native';
import React from 'react';
import Images from '../../constants/Images';
import {styles} from './styles';
import CustomText from '../CustomText/CustomText';
import theme from '../../utils/theme';

const LogoText = ({logostyle}) => {
  return (
    <View style={[styles.logoview, logostyle]}>
      <Image style={theme.img} source={Images.logo} resizeMode="cover" />
    </View>
  );
};

export default LogoText;
