import {FlatList, TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../CustomText/CustomText';
import {styles} from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import theme from '../../utils/theme';

const Accounts = ({
  onLongPress,
  data,
  onPlus,
  onPress,
  customStyle,
  hideback,
  hide,
  selected,
  hideDashboardIcon,
}) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.row, customStyle]}>
      {!hideback ? (
        <AntDesign
          onPress={() => navigation.goBack()}
          name="left"
          size={24}
          color="black"
        />
      ) : (
        <View />
      )}
      <View style={styles.row1}>
        {!hideDashboardIcon ? (
          <TouchableOpacity
            onPress={() => {
              if (onPress) {
                onPress('All');
              }
            }}
            onLongPress={onLongPress}
            activeOpacity={0.6}
            style={{
              ...styles.all,
              borderColor: 'All' == selected ? theme.red : theme.black,
            }}>
            <CustomText numberOfLines={1} textStyle={styles.name}>
              {''}
            </CustomText>
          </TouchableOpacity>
        ) : (
          <View />
        )}
        {data?.length ? (
          <FlatList
            nestedScrollEnabled
            style={styles.list}
            horizontal
            data={data.slice(0, 5)}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    if (onPress) {
                      onPress(item?._id);
                    }
                  }}
                  onLongPress={onLongPress}
                  activeOpacity={0.6}
                  style={{
                    ...styles.account,
                    borderColor:
                      item?._id == selected ? theme.red : theme.black,
                  }}>
                  <CustomText numberOfLines={1} textStyle={styles.name}>
                    {item?.accountName.charAt(0)}
                  </CustomText>
                </TouchableOpacity>
              );
            }}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : null}
        {!hide ? (
          <>
            {data?.length < 5 ? (
              <AntDesign
                onPress={onPlus}
                name={'pluscircleo'}
                size={25}
                color="black"
              />
            ) : null}
          </>
        ) : (
          <View />
        )}
      </View>
      <View />
    </View>
  );
};

export default Accounts;
