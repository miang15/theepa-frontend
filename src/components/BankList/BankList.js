import {Image, TextInput, TouchableOpacity, View} from 'react-native';
import React, {forwardRef, useEffect, useRef, useState} from 'react';
import {styles} from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import theme from '../../utils/theme';
import CustomText from '../CustomText/CustomText';
import ToggleSwitch from 'toggle-switch-react-native';
import Images from '../../constants/Images';

const BankList = ({
  onEditPress,
  onStar,
  isSync,
  selected,
  onChangeText,
  bankName,
  onSync,
  autoFocus,
  editable,
  onBlur,
  bankNumber,
  bankIcon,
}) => {
  const inputRef = useRef(null);

  const handleEditButtonPress = () => {
    if (inputRef.current) {
      if (onEditPress) {
        onEditPress();
      }
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  };

  return (
    <View style={styles.row}>
      <AntDesign
        onPress={onStar}
        name={selected}
        size={18}
        color={theme.secondary}
      />
      <View style={styles.row2}>
        <View style={styles.bankview}>
          <Image
            source={bankIcon ? {uri: bankIcon} : Images.allbanksiconHome}
            resizeMode="contain"
            style={theme.img}
          />
        </View>
        <View style={styles.inputrow}>
          <View style={styles.column1}>
            <TextInput
              ref={inputRef}
              autoFocus={autoFocus}
              style={styles.bank}
              numberOfLines={1}
              value={bankName}
              onChangeText={onChangeText}
              editable={editable}
              onBlur={onBlur}
            />
            <CustomText numberOfLines={1} textStyle={styles.num}>
              {bankNumber}
            </CustomText>
          </View>
          {/* <TouchableOpacity
            onPress={handleEditButtonPress}
            activeOpacity={theme.opacity}
            style={styles.edit}>
            <Image
              style={{...theme.img, tintColor: theme.secondary}}
              source={Images.edit}
              resizeMode="cover"
            />
          </TouchableOpacity> */}
        </View>
      </View>
      <ToggleSwitch
        isOn={isSync}
        onColor={theme.secondary}
        offColor={theme.lightgrey}
        size="small"
        onToggle={onSync}
      />
    </View>
  );
};

export default BankList;
