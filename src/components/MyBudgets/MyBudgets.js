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
import {useNavigation} from '@react-navigation/native';

const MyBudgets = ({progressData, checked, hideFilter, setChecked}) => {
  const navigation = useNavigation();
  const menuref = useRef();
  const data = ['Completed', 'Incomplete'];

  useEffect(() => {
    navigation.addListener('blur', () => {
      menuref?.current?.close();
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <CustomText numberOfLines={1} textStyle={styles.heading}>
          {'My Budgets'}
        </CustomText>
        {hideFilter ? null : (
          <Menu ref={menuref}>
            <MenuTrigger>
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
                            if (item == 'Completed') {
                              setChecked('completed');
                            } else {
                              setChecked('incompleted');
                            }
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
              item?.spend > 0 && item?.amount > 0
                ? item?.spend / item?.amount
                : 0;
            const progress = result > 1 ? 1 : result;
            return (
              <CustomProgress
                alert={true}
                key={index}
                label={item?.category?.name}
                value={
                  item?.spend > 0
                    ? `${item?.spend}/${item?.amount}`
                    : item?.amount
                }
                progress={progress}
              />
            );
          }}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <CustomText textStyle={styles.nodata}>No Budgets Available</CustomText>
      )}
    </View>
  );
};

export default MyBudgets;
