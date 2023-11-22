import {View, ScrollView} from 'react-native';
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
import {useDispatch, useSelector} from 'react-redux';
import {getDashboardAction} from '../../redux/Dashboard/DashboardAction';
import {DASHBOARD} from '../../config/endpoint';
import {useNavigation} from '@react-navigation/native';

const CashFlow = ({
  heading,
  label1,
  label2,
  value1,
  value2,
  progress1,
  progress2,
  checked,
  setChecked,
  hideFilter,
}) => {
  const navigation = useNavigation();
  const [selected, setselected] = useState(false);
  const accounts = useSelector(state => state?.DashboardReducer?.accounts);
  const dispatch = useDispatch();
  const menuref = useRef();
  const data = ['Week', 'Month', 'Year'];

  const handleAccountFilter = async val => {
    setselected(val?.accountName);
    dispatch(
      getDashboardAction(`${DASHBOARD.getDashboardData}?accountid=${val?._id}`),
    );
    menuref.current.close();
  };

  useEffect(() => {
    navigation.addListener('blur', () => {
      menuref?.current?.close();
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <CustomText numberOfLines={1} textStyle={styles.heading}>
          {heading}
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
                {checked == 'Account' ? (
                  <>
                    {accounts?.UserAccounts?.map((item, index) => {
                      return (
                        <MenuOption key={index} style={styles.accountsrow3}>
                          <Checkbox
                            status={
                              selected == item?.accountName
                                ? 'checked'
                                : 'unchecked'
                            }
                            onPress={() => handleAccountFilter(item)}
                            color={theme.skyblue}
                            uncheckedColor={theme.black}
                          />
                          <CustomText
                            numberOfLines={1}
                            textStyle={styles.option}>
                            {item?.accountName}
                          </CustomText>
                        </MenuOption>
                      );
                    })}
                  </>
                ) : null}
              </ScrollView>
            </MenuOptions>
          </Menu>
        )}
      </View>
      <CustomProgress
        label={label1}
        value={value1}
        progress={progress1 > 1 ? 1 : progress1}
      />
      <CustomProgress
        label={label2}
        value={value2}
        progress={progress2 > 1 ? 1 : progress2}
      />
    </View>
  );
};

export default CashFlow;
