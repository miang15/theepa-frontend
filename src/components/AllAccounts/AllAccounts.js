import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {styles} from './styles';
import Images from '../../constants/Images';
import CustomText from '../CustomText/CustomText';
import theme from '../../utils/theme';
import {scaleFont, scaleHeight, scaleWidth} from '../../utils/Layout';

const AllAccounts = ({
  topview,
  onPress,
  onPressAll,
  onPlus,
  selected,
  data,
}) => {
  return (
    <View style={[styles.row, topview]}>
      <TouchableOpacity
        onPress={onPlus}
        activeOpacity={theme.opacity}
        style={styles.addview}>
        <Image style={styles.add} source={Images.add} resizeMode="contain" />
        <CustomText textStyle={styles.banknames} numberOfLines={1}>
          Add Bank
        </CustomText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (onPressAll) {
            onPressAll('All');
          }
        }}
        activeOpacity={theme.opacity}
        style={{...styles.bankview, width: scaleWidth(75)}}>
        <View
          style={{
            ...styles.imgview,
            borderColor: selected == 'All' ? theme.secondary : theme.lightgrey,
            backgroundColor:
              selected == 'All' ? theme.secondarylight : theme.offwhite,
          }}>
          <Image
            source={Images.allbanksiconHome}
            style={theme.img}
            resizeMode="contain"
          />
        </View>
        <CustomText textStyle={styles.banknames} numberOfLines={1}>
          {'All Accounts'}
        </CustomText>
      </TouchableOpacity>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={{flexGrow: 0}}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        horizontal={true}>
        {data?.length
          ? data?.map((item, index) => {
              const imagePathRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (onPress) {
                      onPress(item?._id, item);
                    }
                  }}
                  activeOpacity={theme.opacity}
                  key={item?._id}
                  style={styles.bankview}>
                  <View
                    style={{
                      ...styles.imgview,
                      borderColor:
                        selected == 'All'
                          ? theme.lightgrey
                          : selected == item?._id
                          ? theme.secondary
                          : theme.lightgrey,
                      backgroundColor:
                        selected == 'All'
                          ? theme.offwhite
                          : selected == item?._id
                          ? theme.secondarylight
                          : theme.offwhite,
                    }}>
                    {imagePathRegex.test(item?.Icon) ? (
                      <Image
                        source={{uri: item?.Icon}}
                        style={theme.img}
                        resizeMode="contain"
                      />
                    ) : (
                      <CustomText style={{alignSelf: 'center'}}>
                        {item?.Icon}
                      </CustomText>
                    )}
                  </View>
                  <CustomText textStyle={styles.banknames} numberOfLines={1}>
                    {item?.accountName}
                  </CustomText>
                </TouchableOpacity>
              );
            })
          : null}
      </ScrollView>
    </View>
  );
};

export default AllAccounts;
