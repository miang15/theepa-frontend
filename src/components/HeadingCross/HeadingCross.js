import {View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomText from '../CustomText/CustomText';
import {styles} from './styles';
import Images from '../../constants/Images';
import theme from '../../utils/theme';

const HeadingCross = ({customrow, onCross, headingStyle, hideCross, label}) => {
  return (
    <View style={[styles.row, customrow]}>
      <CustomText textStyle={[styles.heading, headingStyle]} numberOfLines={1}>
        {label}
      </CustomText>
      {!hideCross ? (
        <TouchableOpacity onPress={onCross} activeOpacity={theme.opacity}>
          <Image source={Images.cross} resizeMode="contain" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default HeadingCross;
