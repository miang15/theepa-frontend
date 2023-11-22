import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomText from '../CustomText/CustomText';
import ToggleSwitch from 'toggle-switch-react-native';
import theme from '../../utils/theme';
import {styles} from './styles';

const ToggleLabel = ({label, sync, disabled, onToggle}) => {
  return (
    <View style={styles.row2}>
      <CustomText
        numberOfLines={2}
        textStyle={{
          ...styles.sync,
          color: disabled ? theme.gray : theme.black,
        }}>
        {label}
      </CustomText>
      <ToggleSwitch
        disabled={disabled}
        isOn={sync}
        onColor={disabled ? theme.lightgray : theme.secondary}
        offColor={disabled ? theme.lightgray : theme.gray}
        size="small"
        onToggle={onToggle}
      />
    </View>
  );
};

export default ToggleLabel;
