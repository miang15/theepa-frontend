import {TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../../utils/theme';
import {styles} from './styles';
import CustomText from '../CustomText/CustomText';

const BackHeader = ({onPress, title}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.container}>
      <Ionicons name="chevron-back" size={20} color={theme.black} />
      <CustomText textStyle={styles.label} numberOfLines={1}>
        {title}
      </CustomText>
    </TouchableOpacity>
  );
};

export default BackHeader;
