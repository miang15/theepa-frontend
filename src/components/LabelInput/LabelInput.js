import {
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {styles} from './styles';
import Images from '../../constants/Images';
import theme from '../../utils/theme';

const LabelInput = ({
  customView,
  label,
  value,
  onChangeText,
  keyboardType,
  disabled,
  placeholder,
  onPress,
  Icon,
  editable,
  customInput,
  secureTextEntry,
  tintColor,
  onIcon,
  ...rest
}) => {
  return (
    <View style={[styles.container, customView]}>
      <Text style={styles.heading} numberOfLines={1}>
        {label}
      </Text>
      <TouchableOpacity
        onPress={onPress}
        style={styles.row}
        disabled={disabled}>
        <TextInput
          {...rest}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          style={[styles.input, customInput]}
          placeholder={placeholder}
          placeholderTextColor={theme.lightgrey}
          editable={editable}
          secureTextEntry={secureTextEntry}
        />
        {Icon ? (
          <TouchableOpacity
            accessibilityLabel="secure-text-toggle"
            onPress={onIcon}
            activeOpacity={theme.opacity}>
            <Image
              source={Icon}
              style={{tintColor: tintColor}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : // </View>
        null}
      </TouchableOpacity>
    </View>
  );
};

export default LabelInput;
