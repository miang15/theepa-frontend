import {View, ScrollView, FlatList} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {optionsStyles, styles} from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomText from '../CustomText/CustomText';
import theme from '../../utils/theme';
import {scaleHeight, scaleWidth} from '../../utils/Layout';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {Checkbox} from 'react-native-paper';
import CustomProgress from '../CustomProgress/CustomProgress';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const CustomGoals = ({
  progressData,
  disabled,
  hideFilter,
  checked,
  setChecked,
}) => {
  const navigation = useNavigation();
  const user = useSelector(state => state.auth.user);
  const menuref = useRef();
  const data = ['Completed', 'Unachieved'];

  useEffect(() => {
    navigation.addListener('blur', () => {
      menuref?.current?.close();
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <CustomText numberOfLines={1} textStyle={styles.heading}>
          {'My Goals'}
        </CustomText>
        {hideFilter ? null : (
          <Menu ref={menuref}>
            <MenuTrigger disabled={disabled}>
              <AntDesign name="filter" size={22} color={theme.primary} />
            </MenuTrigger>
            <MenuOptions customStyles={optionsStyles}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {data?.map((item, index) => {
                  return (
                    <MenuOption key={index} style={styles.row3}>
                      <Checkbox
                        status={checked == item ? 'checked' : 'unchecked'}
                        onPress={() => {
                          if (setChecked) {
                            setChecked(item);
                          }
                          menuref.current.close();
                        }}
                        color={theme.skyblue}
                        uncheckedColor={theme.black}
                      />
                      <CustomText numberOfLines={1} textStyle={styles.option}>
                        {item}
                      </CustomText>
                    </MenuOption>
                  );
                })}
              </ScrollView>
            </MenuOptions>
          </Menu>
        )}
      </View>

      {progressData?.length ? (
        <FlatList
          nestedScrollEnabled
          data={progressData}
          style={{maxHeight: scaleHeight(110)}}
          renderItem={({item, index}) => {
            const result =
              item?.targetAmount > 0 && item?.currentAmount > 0
                ? item?.currentAmount / item?.targetAmount
                : 0;
            const progress = result > 1 ? 1 : result;
            return (
              <CustomProgress
                key={index}
                label={item?.name}
                value={
                  item?.currentAmount > 0
                    ? `${item?.currentAmount}/${item?.targetAmount}`
                    : item?.targetAmount
                }
                progress={progress}
              />
            );
          }}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <CustomText textStyle={styles.nodata}>No Goals Available</CustomText>
      )}
    </View>
  );
};

export default CustomGoals;
