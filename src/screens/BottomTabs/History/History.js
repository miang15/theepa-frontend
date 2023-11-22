import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {styles} from './styles';
import {
  Accounts,
  AllAccounts,
  DrawerHeader,
  TransactionCard,
} from '../../../components';
import {useDispatch, useSelector} from 'react-redux';
import CustomText from '../../../components/CustomText/CustomText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import theme from '../../../utils/theme';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {Checkbox} from 'react-native-paper';
import http from '../../../config/http';
import moment from 'moment';
import {setAppLoading} from '../../../redux/AppLoader/appLoaderAction';
import Images from '../../../constants/Images';
import analytics from '@react-native-firebase/analytics';
import {useIsFocused} from '@react-navigation/native';

const History = ({navigation}) => {
  const accounts = useSelector(state => state?.DashboardReducer?.accounts);
  const menuref = useRef();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const data = [
    'Latest',
    'Old',
    'Price Low to High',
    'Price High to Low',
    'Income',
    'Expense',
  ];
  const [allhistory, setallhistory] = useState([]);
  const [selected, setselected] = useState('All');

  useEffect(() => {
    navigation.addListener('blur', () => {
      menuref?.current?.close();
    });
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      dispatch(setAppLoading(true));
      getHistory();
      setselected('All');
      setChecked('');
      dispatch(setAppLoading(false));
    });
  }, [isFocused]);

  const getHistory = async () => {
    try {
      const res = await http.get('history/');

      const history = res?.data?.data?.TransactionHistory?.categoryhistory;
      if (history?.length) {
        setallhistory(history);
      } else {
        setallhistory([]);
      }
      dispatch(setAppLoading(false));
    } catch (error) {}
  };

  const handleFilterHistory = async (val, bank) => {
    let link =
      bank && bank == 'All'
        ? `history/?limit=0`
        : bank && bank !== 'All'
        ? `history/${bank}?limit=0`
        : selected && selected !== 'All'
        ? `history/${selected}?limit=0`
        : `history/?limit=0`;

    if (val == 'Latest') {
      link += `&date=newtoold`;
    }
    if (val == 'Old') {
      link += `&date=oldtonew`;
    }
    if (val == 'Price Low to High') {
      link += `&amount=ascending`;
    }
    if (val == 'Price High to Low') {
      link += `&amount=decending`;
    }
    if (val == 'Income') {
      link += `&sort=income`;
    }
    if (val == 'Expense') {
      link += `&sort=expense`;
    }
    const res = await http.get(link);

    const history = res?.data?.data?.TransactionHistory?.categoryhistory;
    setallhistory(history);
    dispatch(setAppLoading(false));
    await analytics().logEvent('history_filter', {
      description: `History filter`,
    });
  };

  const handleFilter = async val => {
    if (checked == val) {
      setChecked('');
      dispatch(setAppLoading(true));
      handleFilterHistory();
    } else {
      setChecked(val);
      handleFilterHistory(val);
      dispatch(setAppLoading(true));
    }
    menuref.current.close();
  };
  const handleAddAccount = async () => {
    try {
      navigation.navigate('ManualAccount');
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <DrawerHeader />
      <AllAccounts
        data={accounts?.UserAccounts}
        onPress={val => {
          setselected(val);
          dispatch(setAppLoading(true));
          handleFilterHistory(checked, val);
        }}
        onPressAll={val => {
          setselected(val);
          dispatch(setAppLoading(true));
          handleFilterHistory(checked, val);
        }}
        onPlus={handleAddAccount}
        selected={selected}
      />

      <View style={styles.row}>
        <CustomText numberOfLines={1} textStyle={styles.heading}>
          Your Transaction History
        </CustomText>
        <Menu ref={menuref}>
          <MenuTrigger>
            {/* <Image source={Images.filter} resizeMode="cover" /> */}
            <AntDesign name="filter" size={22} color={theme.primary} />
          </MenuTrigger>
          <MenuOptions>
            <ScrollView showsVerticalScrollIndicator={false}>
              {data?.map((item, index) => {
                return (
                  <MenuOption key={index} style={styles.row3}>
                    <Checkbox
                      status={checked == item ? 'checked' : 'unchecked'}
                      onPress={() => handleFilter(item)}
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
      </View>
      {allhistory?.length ? (
        <FlatList
          data={allhistory}
          style={styles.history}
          renderItem={({item, index}) => {
            return (
              <TransactionCard
                Icon={item?.category?.icon || null}
                accountName={item?.accountID?.accountName}
                color={
                  item?.type == 'expense'
                    ? theme.redprimary
                    : theme.secondarylight
                }
                category={
                  item?.label
                    ? item?.label
                    : item?.goals
                    ? item?.goals?.name
                    : item?.category?.name
                    ? item?.category?.name
                    : 'Uncategorized'
                }
                amount={
                  item?.type == 'expense'
                    ? `- PKR ${item?.amount}`
                    : `+ PKR ${item?.amount}`
                }
                date={moment(item?.time).format('DD MMM, YY')}
                key={index}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <CustomText textStyle={styles.nodata}>No History Available</CustomText>
      )}
    </View>
  );
};

export default History;
