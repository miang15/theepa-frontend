import React from 'react';
import {styles} from './styles';
import {Text} from 'react-native';

const CustomText = ({textStyle, numberOfLines, ...rest}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[styles.text, textStyle]}
      {...rest}
    />
  );
};

export default CustomText;
