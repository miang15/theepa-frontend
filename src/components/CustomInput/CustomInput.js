import React from 'react';
import {TextInput} from 'react-native-paper';
import theme from '../../utils/theme';
import {styles} from './styles';

const CustomInput = ({
  customStyle,
  mode,
  label,
  value,
  onChangeText,
  keyboardType,
  ...rest
}) => {
  return (
    <TextInput
      {...rest}
      label={label}
      mode={mode || 'outlined'}
      value={value}
      onChangeText={onChangeText}
      style={[styles.input, customStyle]}
      outlineColor={theme.black}
      activeOutlineColor={theme.blue}
      keyboardType={keyboardType}
    />
  );
};

export default CustomInput;
