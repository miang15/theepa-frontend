import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import Chip from '../Chip/Chip';
import CustomText from '../CustomText/CustomText';
import Images from '../../constants/Images';
import theme from '../../utils/theme';
import {Checkbox} from 'react-native-paper';

const CustomVendors = ({selectedvendor, vendors, onCross, handleVendor}) => {
  const [showlist, setshowlist] = useState(false);
  const ComponentType = selectedvendor?.length ? View : TouchableOpacity;

  return (
    <View style={styles.container}>
      <Text style={styles.heading} numberOfLines={1}>
        {'Select Vendors'}
      </Text>
      {showlist ? (
        <View style={styles.column}>
          <TouchableOpacity
            style={{alignSelf: 'flex-end'}}
            onPress={() => setshowlist(false)}
            activeOpacity={theme.opacity}>
            <Image source={Images.arrowup} resizeMode="contain" />
          </TouchableOpacity>
          {selectedvendor?.length ? (
            <FlatList
              style={styles.selectedlist}
              numColumns={2}
              columnWrapperStyle={{justifyContent: 'space-between'}}
              data={selectedvendor}
              renderItem={({item, index}) => {
                return (
                  <Chip
                    customrow={{maxWidth: '48%'}}
                    title={item}
                    onCross={() => {
                      if (onCross) {
                        onCross(index);
                      }
                    }}
                  />
                );
              }}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index}
            />
          ) : null}
          <FlatList
            style={styles.vendorlist}
            data={vendors}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            numColumns={2}
            renderItem={({item, index}) => {
              return (
                <View key={index} style={styles.vendorrow}>
                  <Checkbox
                    disabled={
                      selectedvendor?.length == 5
                        ? selectedvendor.includes(item)
                          ? false
                          : true
                        : false
                    }
                    status={
                      selectedvendor.includes(item) ? 'checked' : 'unchecked'
                    }
                    onPress={() => {
                      if (handleVendor) {
                        handleVendor(item);
                      }
                    }}
                    color={theme.secondary}
                    uncheckedColor={theme.black}
                  />
                  <CustomText textStyle={styles.vendorItem} numberOfLines={1}>
                    {item}
                  </CustomText>
                </View>
              );
            }}
            keyExtractor={(item, index) => index}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <ComponentType onPress={() => setshowlist(true)} style={styles.row1}>
          {selectedvendor?.length ? (
            <View style={styles.innerrow}>
              <Chip
                title={selectedvendor[0]}
                onCross={() => {
                  if (onCross) {
                    onCross(0);
                  }
                }}
              />
              {selectedvendor[1] ? (
                <Chip
                  title={selectedvendor[1]}
                  onCross={() => {
                    if (onCross) {
                      onCross(1);
                    }
                  }}
                />
              ) : null}
              {selectedvendor?.length > 2 ? (
                <View style={styles.countview}>
                  <CustomText textStyle={styles.count}>
                    {`+${selectedvendor.length - 2}`}
                  </CustomText>
                </View>
              ) : null}
            </View>
          ) : (
            <CustomText numberOfLines={1} textStyle={styles.placeholder}>
              Select upto 5 vendors
            </CustomText>
          )}
          <TouchableOpacity
            onPress={() => setshowlist(true)}
            activeOpacity={theme.opacity}>
            <Image source={Images.dropdown} resizeMode="contain" />
          </TouchableOpacity>
        </ComponentType>
      )}
    </View>
  );
};

export default CustomVendors;
