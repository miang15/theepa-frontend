import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Modal, Portal} from 'react-native-paper';
import CustomText from '../CustomText/CustomText';
import {styles} from './styles';
import Entypo from 'react-native-vector-icons/Entypo';
import theme from '../../utils/theme';
import CustomButton from '../CustomButton/CustomButton';
import moment from 'moment';

const DetailModal = ({
  visible,
  setVisible,
  heading,
  amount,
  category,
  startdate,
  enddate,
  onEdit,
  onDelete,
  saved,
}) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={setVisible}
        contentContainerStyle={styles.container}>
        <View style={styles.row1}>
          <View style={styles.empty} />
          <CustomText numberOfLines={1} textStyle={styles.heading}>
            {heading}
          </CustomText>
          <Entypo
            onPress={setVisible}
            name="cross"
            size={24}
            color={theme.black}
          />
        </View>
        {amount ? (
          <CustomText
            numberOfLines={1}
            textStyle={styles.item}>{`Amount: ${amount}`}</CustomText>
        ) : null}
        {saved ? (
          <CustomText
            numberOfLines={1}
            textStyle={styles.item}>{`Saved: ${saved}`}</CustomText>
        ) : null}
        {category ? (
          <CustomText
            numberOfLines={1}
            textStyle={styles.item}>{`Category: ${category}`}</CustomText>
        ) : null}
        {startdate ? (
          <CustomText
            numberOfLines={1}
            textStyle={styles.item}>{`Start Date: ${moment(startdate).format(
            'DD/MM/YYYY',
          )}`}</CustomText>
        ) : null}
        {enddate ? (
          <CustomText
            numberOfLines={1}
            textStyle={styles.item}>{`End Date: ${moment(enddate).format(
            'DD/MM/YYYY',
          )}`}</CustomText>
        ) : null}
        <View style={styles.row2}>
          <CustomButton
            onPress={onEdit}
            title={'Edit'}
            customStyle={styles.edit}
          />
          <CustomButton
            onPress={onDelete}
            title={'Delete'}
            customStyle={styles.edit}
          />
        </View>
      </Modal>
    </Portal>
  );
};

export default DetailModal;
