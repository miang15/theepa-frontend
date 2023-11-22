import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomText from '../CustomText/CustomText';
import {styles} from './styles';
import theme from '../../utils/theme';

const Chip = ({title, onCross, customrow}) => {
  return (
    <View style={[styles.row, customrow]}>
      <CustomText textStyle={styles.label} numberOfLines={1}>
        {title}
      </CustomText>
      <AntDesign onPress={onCross} name="close" size={20} color={theme.white} />
    </View>
  );
};

export default Chip;
