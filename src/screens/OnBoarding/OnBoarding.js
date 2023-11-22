import {
  StyleSheet,
  Text,
  FlatList,
  PermissionsAndroid,
  View,
  Keyboard,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {styles} from './styles';
import SmsAndroid from 'react-native-get-sms-android';
import {showMessage} from 'react-native-flash-message';
import {Modal, Provider, Portal} from 'react-native-paper';
import CustomText from '../../components/CustomText/CustomText';
import CustomButton from '../../components/CustomButton/CustomButton';
import theme from '../../utils/theme';
import Swiper from 'react-native-swiper';
import {
  BankList,
  CustomCategory,
  CustomGradient,
  CustomPicker,
  CustomProgress,
  CustomVendors,
  HeadingCross,
  LabelInput,
} from '../../components';
import Loader from '../../components/Loader/Loader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Images from '../../constants/Images';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {scaleHeight, scaleWidth} from '../../utils/Layout';
import {useDispatch, useSelector} from 'react-redux';
import {
  setAppLoading,
  setAppToast,
} from '../../redux/AppLoader/appLoaderAction';
import http from '../../config/http';
import {
  ACCOUNT,
  AUTH,
  CATEGORIES,
  ONBOARDING,
  REGEX,
  STORAGE_KEYS,
  TRANSACTION,
} from '../../config/endpoint';
import moment from 'moment';
import {
  getProfileAction,
  setUser,
  userUpdateAction,
} from '../../redux/Auth/authAction';
import {
  checksmspermission,
  clearLocalStorage,
  compareAccountNumbers,
  getDeviceSms,
  getLocalStorage,
  handleExtraSms,
  removeLocalStorage,
  requestSmsPermission,
  setLocalStorage,
} from '../../constants/functions';
import EmojiSelector, {Categories} from 'react-native-emoji-selector';
import {CommonActions, useRoute} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import BackHeader from '../../components/BackHeader/BackHeader';
import {
  editAccountAction,
  getAccountAction,
  primaryAccountAction,
} from '../../redux/Dashboard/DashboardAction';
import {setAllBankSms} from '../../redux/SMSParsing/SMSParsingAction';
import {Checkbox} from 'react-native-paper';
import {BankKeywords, ignoreNumbers} from '../../DummyData/DummyData';
import DeviceInfo from 'react-native-device-info';
import {getCategoryIconsAction} from '../../redux/Category/CategoryAction';
import {handleAllTransactions} from '../../constants/Transactions';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';
import {AllRegex} from '../../DummyData/AllRegex';

const OnBoarding = ({navigation}) => {
  const user = useSelector(state => state.auth.user);
  const allBanksRegex = useSelector(
    state => state?.SMSParsingReducer?.allBanksRegex,
  );
  const allTransactions = useSelector(
    state => state?.SMSParsingReducer?.allTransactions,
  );
  const allIcons = useSelector(state => state?.CategoryReducer?.categoryIcons);
  const accounts = useSelector(state => state?.DashboardReducer?.accounts);
  const [access, setaccess] = useState(false);
  const [loading, setloading] = useState(true);
  const [visible, setVisible] = React.useState(false);
  const [categoryname, setcategoryname] = useState('');
  const [categoryIcon, setcategoryIcon] = useState('');
  const [goal, setgoal] = useState('');
  const [goalamount, setgoalamount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState();
  const [startdate, setstartdate] = useState();
  const [startdatemodal, setstartdatemodal] = useState(false);
  const [enddate, setenddate] = useState();
  const [enddatemodal, setenddatemodal] = useState(false);
  const [allCategory, setAllCategory] = useState([]);
  const [error, seterror] = useState({type: '', msg: ''});
  const [dropdownCategory, setdropdownCategory] = useState([]);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [editbank, seteditbank] = useState(false);
  const [editable, seteditable] = useState('');
  const [emojiIcon, setEmojiIcon] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [allBanks, setAllBanks] = useState([]);
  const [initialIndex, setinitialIndex] = useState(0);
  const [primarybank, setprimarybank] = useState('');
  const [myGoals, setMyGoals] = useState([]);
  const [allVendors, setAllVendors] = useState([]);
  const [showvendor, setshowvendor] = useState(false);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [categoryData, setcategoryData] = useState([]);
  const [smsallow, setsmsallow] = useState(false);
  const [incomesms, setincomesms] = useState([]);
  const [unmatchedsms, setunmatchedsms] = useState([]);
  const [allCategoryIcons, setAllCategoryIcons] = useState([]);
  const bankNameCount = {};

  const [balance, setbalance] = useState('');
  const swiperRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await analytics().logEvent('onboarding', {
        description: `Onboarding page ${initialIndex}`,
      });
      await handleGetCategories();
      setLocalStorage(STORAGE_KEYS.ONBOARDING_PAGE, 'onboarding');
      getSmsPermission();
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (allIcons?.length) {
      setAllCategoryIcons(allIcons);
    }
  }, [allIcons]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handlePrimaryAccount = async val => {
    if (val?.accountID == primarybank) {
      const primarydata = {
        isprimary: true,
      };

      dispatch(primaryAccountAction(primarydata, val?._id));
    }
  };

  const handleAccounts = async val => {
    try {
      dispatch(setAppLoading(true));
      const bankNames2 = accounts?.UserAccounts?.map(bank => bank?.accountID);
      if (accounts?.UserAccounts?.length) {
        accounts?.UserAccounts?.map(bank => {
          allBanks?.forEach(async (item, index) => {
            if (!bankNames2?.includes(item?.accountID) && item?.isSync) {
              const data = {
                accountName: item?.bank,
                isSync: item?.isSync,
                amount: Number(0),
                accountID: item?.accountID,
                Icon: item?.bankIcon,
              };

              const accountRes = await http.post(ACCOUNT.addaccount, data);
              if (accountRes?.data?.success) {
                const bank = accountRes?.data?.data?.budget?.account;
                handlePrimaryAccount(bank);
              }
            } else if (
              (item?.bank !== bank?.accountName ||
                item?.isSync !== bank?.isSync ||
                primarybank !== item?.accountID) &&
              bank?.accountID == item?.accountID
            ) {
              const data = {
                accountName: item?.bank,
                isSync: item?.isSync,
                accountID: item?.accountID,
              };

              await dispatch(editAccountAction(data, bank?._id));
              handlePrimaryAccount(bank);
            }
          });
        });
      } else {
        allBanks?.forEach(async (item, index) => {
          if (item?.isSync) {
            const data = {
              accountName: item?.bank,
              isSync: item?.isSync,
              amount: Number(0),
              accountID: item?.accountID,
              Icon: item?.bankIcon,
            };

            const accountRes = await http.post(ACCOUNT.addaccount, data);
            if (accountRes?.data?.success) {
              const bank = accountRes?.data?.data?.budget?.account;
              handlePrimaryAccount(bank);
            }
          }
        });
      }

      await analytics().logEvent('account_creation', {
        description: `Synced account created`,
      });

      await setLocalStorage(STORAGE_KEYS.USER_BANKS, JSON.stringify(allBanks));
      await setLocalStorage(STORAGE_KEYS.PRIMARY_BANK, primarybank);
      await dispatch(getAccountAction());
      dispatch(setAppLoading(false));
    } catch (error) {}
  };

  const countMatchingKeywords = sms => {
    const smsWords = sms.toLowerCase().split(/\W+/);
    let matchCount = 0;

    BankKeywords.forEach(keyword => {
      if (smsWords.includes(keyword)) {
        matchCount++;
      }
    });

    return matchCount;
  };

  const getSmsPermission = async () => {
    try {
      const result = await checksmspermission();
      if (result) {
        syncMessage();
      } else {
        setloading(false);
      }
    } catch (error) {
      console.log('sms permission', error);
    }
  };

  const requestPermission = async () => {
    const grant = await requestSmsPermission();
    if (grant == 'granted') {
      await syncMessage();
    } else {
      showMessage({
        message: 'Failed',
        description: 'sms permission denied',
        type: 'danger',
        duration: 1500,
      });
    }
  };

  const getModifiedBankName = bankName => {
    if (bankNameCount[bankName]) {
      bankNameCount[bankName]++;
      return `${bankName} ${bankNameCount[bankName]}`;
    } else {
      bankNameCount[bankName] = 1;
      return bankName;
    }
  };

  const syncMessage = async () => {
    setloading(true);
    const sms = await getDeviceSms();
    let extraSms = [];
    let checked = [];
    if (sms?.length) {
      let banksms = [];
      sms.forEach((item, index) => {
        allBanksRegex?.forEach(val => {
          if (
            val?.bankNumber.includes(Number(item?.address?.replace(/^\+/, '')))
          ) {
            const date = new Date(item?.date);
            const formattedDate = date.toLocaleDateString();
            const formattedTime = date.toLocaleTimeString();

            banksms.push({
              address: item?.address,
              body: item?.body,
              date: formattedDate,
              time: formattedTime,
              timestamp: item?.date.toString(),
              bankIcon: val?.bankIcon,
            });
            checked.push(index);
          }
        });

        if (!checked.includes(index)) {
          const matchCount = countMatchingKeywords(item?.body);

          if (
            matchCount >= 2 &&
            !ignoreNumbers?.includes(item?.address?.toLowerCase())
          ) {
            extraSms.push({
              bankNumber: item?.address.toString(),
              sms: item?.body,
            });
            checked.push(index);
          }
        }
      });

      if (banksms?.length) {
        let matchedSmS = [];
        const groupedMessages = allBanksRegex.map(bank => {
          return {
            ...bank,
            messages: banksms.filter(message =>
              bank?.bankNumber.includes(
                Number(message?.address?.replace(/^\+/, '')),
              ),
            ),
          };
        });

        groupedMessages?.forEach(bank => {
          bank?.messages?.forEach(sms => {
            let matchedInDebit = false;
            let matchedInCredit = false;
            bank?.regex?.debit.forEach((item, index) => {
              const newRegex = new RegExp(item);

              const matched = sms?.body.match(newRegex);

              if (matched && !matchedInDebit) {
                matchedSmS?.push({
                  ...matched?.groups,
                  bankName: bank?.bankName,
                  bankIcon: bank?.bankIcon,
                  date: sms?.date,
                  time: sms?.time,
                  timestamp: sms?.timestamp,
                  type: 'debit',
                  matchedRegex: newRegex,
                });
                matchedInDebit = true;
              }
            });
            if (!matchedInDebit) {
              bank?.regex?.credit.forEach((item, index) => {
                const newRegex = new RegExp(item);
                const matched = sms?.body.match(newRegex);

                if (matched && !matchedInCredit) {
                  matchedSmS?.push({
                    ...matched?.groups,
                    bankName: bank?.bankName,
                    bankIcon: bank?.bankIcon,
                    date: sms?.date,
                    time: sms?.time,
                    timestamp: sms?.timestamp,
                    type: 'credit',
                    matchedRegex: newRegex,
                  });
                  matchedInCredit = true;
                }
              });
            }

            if (!matchedInDebit && !matchedInCredit) {
              const matchCount = countMatchingKeywords(sms?.body);

              if (
                matchCount >= 2 &&
                !ignoreNumbers?.includes(sms?.address?.toLowerCase())
              ) {
                const isSmsAlreadyPresent = extraSms.some(
                  existingSms => existingSms?.sms === sms?.body,
                );

                if (!isSmsAlreadyPresent) {
                  extraSms.push({
                    bankNumber: sms?.address.toString(),
                    sms: sms?.body,
                  });
                }
              }
            }
          });
        });

        if (matchedSmS?.length) {
          let sms = [];
          const sortedSmsArray = matchedSmS
            .sort((a, b) => {
              const dateA = new Date(`${a?.date} ${a?.time}`);
              const dateB = new Date(`${b?.date} ${b?.time}`);

              return dateA - dateB;
            })
            .reverse();

          sortedSmsArray.map(item => {
            const remaining_balance = parseInt(
              item?.remaining_balance?.replace(/,/g, '').split('.')[0],
              10,
            );
            const amount = parseInt(
              item?.transaction_amount?.replace(/,/g, '').split('.')[0],
              10,
            );

            sms.push({
              ...item,
              account_no: item?.account_no, //account no
              remaining_balance: remaining_balance,
              transaction_amount: amount,
            });
          });
          dispatch(setAllBankSms(sms));
          const uniqueBanks = sortedSmsArray.reduce((unique, current) => {
            const {
              bankName,
              account_no,
              remaining_balance,
              transaction_date,
              transaction_time,
              transaction_amount,
              bankIcon,
            } = current;

            if (!account_no) {
              return unique;
            }

            const found = unique.find(bank =>
              compareAccountNumbers(bank?.account_no, account_no),
            );
            if (!found) {
              unique.push({
                bankName,
                bankIcon,
                account_no,
                remaining_balance: parseInt(
                  remaining_balance?.replace(/,/g, '').split('.')[0],
                  10,
                ),
                transaction_amount: parseInt(
                  transaction_amount?.replace(/,/g, '').split('.')[0],
                  10,
                ),
                latest_transaction_date: transaction_date,
                latest_transaction_time: transaction_time,
              });
            }
            return unique;
          }, []);
          if (uniqueBanks?.length) {
            let arr = [];
            const userbanks = await getLocalStorage(STORAGE_KEYS.USER_BANKS);
            const primary = await getLocalStorage(STORAGE_KEYS.PRIMARY_BANK);
            const parsebanks = JSON.parse(userbanks);
            if (parsebanks?.length) {
              setAllBanks(parsebanks);
              setprimarybank(primary);
            } else {
              uniqueBanks?.forEach(async (item, index) => {
                // const numericValue = item?.account_no?.replace(/[^0-9]/g, '');
                const modifiedBankName = getModifiedBankName(item?.bankName);
                arr.push({
                  id: index,
                  bank: modifiedBankName,
                  amount: item?.remaining_balance,
                  bankIcon: item?.bankIcon,
                  accountID: item?.account_no, //account no
                  isSync: false,
                });

                if (index == 0) {
                  setprimarybank(item?.account_no);
                }
                setAllBanks(arr);
              });
            }
            setaccess(true);
          } else {
            showMessage({
              message: 'Alert',
              description: 'No Unique Banks found',
              type: 'info',
              duration: 1500,
            });
          }
        } else {
          showMessage({
            message: 'Alert',
            description: 'Bank SMS not matched',
            type: 'info',
            duration: 1500,
          });
        }
      } else {
        showMessage({
          message: 'Alert',
          description: 'SMS Number not matched',
          type: 'info',
          duration: 1500,
        });
      }
    } else {
      showMessage({
        message: 'Alert',
        description: 'No SMS found',
        type: 'info',
        duration: 1500,
      });
    }

    if (extraSms.length) {
      setunmatchedsms(extraSms);
    }
    setTimeout(() => {
      setloading(false);
    }, 2000);
  };

  const handleGetCategories = async () => {
    try {
      const allCategoriesRes = await http.get(ONBOARDING.getCategories);
      if (allCategoriesRes?.data?.success) {
        const categories =
          allCategoriesRes?.data?.data?.categories?.categoriesWithBudgets;
        setcategoryData(categories);
        let arr = [...categories];

        let tempCategory = [];

        categories?.forEach((item, index) => {
          tempCategory.push({
            label: item?.name,
            value: item?._id,
          });
        });
        const vendorsArray = categories.flatMap(item => item?.vendors);
        setAllVendors(vendorsArray);
        setdropdownCategory(tempCategory);

        setAllCategory(arr);
      }
    } catch (error) {
      console.log('get categories: ', error);
    }
  };

  const handleAddNew = async () => {
    setcategoryname('');
    setEmojiIcon('');
    setVisible(true);
  };

  const handleAddGoal = async () => {
    seterror({type: '', msg: ''});

    if (!goal.toString().trim()) {
      seterror({type: 'goalname', msg: 'Goal Name is Required'});
    } else if (!goalamount.toString().trim()) {
      seterror({type: 'goalamount', msg: 'Goal Amount is Required'});
    } else if (!startdate) {
      seterror({type: 'startdate', msg: 'Start Date is Required'});
    } else if (!enddate) {
      seterror({type: 'enddate', msg: 'End Date is Required'});
    } else if (startdate > enddate) {
      seterror({
        type: 'startdate',
        msg: 'Start Date must be less then end date',
      });
    } else {
      dispatch(setAppLoading(true));
      const data = {
        name: goal,
        targetAmount: goalamount,
        startDate: startdate,
        endDate: enddate,
      };
      const addgoalRes = await http.post(ONBOARDING.addGoal, data);
      if (addgoalRes?.data?.success) {
        dispatch(
          setAppToast({
            title: 'Success!!!',
            description: addgoalRes?.data?.data?.message,
            status: 'success',
            showToast: true,
          }),
        );
        GetMyGoals();
      }
      dispatch(setAppLoading(false));
    }
  };

  const handleEndDate = async date => {
    seterror({type: '', msg: ''});
    const formatdate = moment(date).format('YYYY-MM-DD');
    if (formatdate < startdate) {
      setenddate('');
      seterror({
        type: 'enddate',
        msg: 'End Date must be greater then start date',
      });
    } else {
      setenddate(formatdate);
    }
    setenddatemodal(false);
  };

  const handleStartDate = async date => {
    const formatdate = moment(date).format('YYYY-MM-DD');
    setstartdate(formatdate);
    setstartdatemodal(false);
  };

  const handleAddCategory = async () => {
    try {
      seterror({type: '', msg: ''});

      if (!categoryname.toString().trim()) {
        seterror({type: 'categoryname', msg: 'Category Name is Required'});
      } else if (!emojiIcon) {
        seterror({type: 'icon', msg: 'Category Icon is Required'});
      } else {
        dispatch(setAppLoading(true));
        const addcategoryRes = await http.post(ONBOARDING.addcategory, {
          name: categoryname,
          icon: emojiIcon,
          vendors: selectedVendors,
        });

        if (addcategoryRes?.data?.success) {
          const result = categoryData.reduce((accumulator, category) => {
            const updatedVendors = category?.vendors.filter(vendor => {
              const matchIndex = selectedVendors.indexOf(vendor);
              if (matchIndex !== -1) {
                selectedVendors.splice(matchIndex, 1); // Remove matched vendor from arr2
                return false; // Exclude matched vendor from updatedVendors
              }
              return true; // Include vendor in updatedVendors
            });

            if (updatedVendors.length !== category?.vendors.length) {
              accumulator.push({_id: category?._id, vendors: updatedVendors});
            }

            return accumulator;
          }, []);

          for (let index = 0; index < result.length; index++) {
            const element = result[index];
            const updatecategoryRes = await http.put(
              `${CATEGORIES.updatecategory}/${element?._id}`,
              {vendors: element?.vendors},
            );
          }
          handleGetCategories();
          setVisible(false);
        }
        dispatch(setAppLoading(false));
      }
    } catch (error) {
      console.log('add category', error);
    }
  };

  const handleGoBack = async () => {
    try {
      setgoal('');
      setgoalamount('');
      setstartdate('');
      setSelectedCategory('');
      setenddate('');
      swiperRef.current.scrollBy(-1, true);
    } catch (error) {}
  };

  const handleOnChange = async (val, ind) => {
    const arr = allBanks.map(item => ({...item}));
    arr[ind].bank = val;
    setAllBanks(arr);
  };

  const handleEdit = async val => {
    seteditable(val);
    seteditbank(true);
  };

  const handleSync = async val => {
    seteditbank(false);
    const arr = [...allBanks];
    arr[val].isSync = !arr[val].isSync;
    setAllBanks(arr);
  };

  const GetMyGoals = async () => {
    try {
      const allgoals = await http.get(ONBOARDING.getallGoals);

      if (allgoals?.data?.success) {
        const mygoals = allgoals?.data?.data?.budget?.ActiveGoal;
        setMyGoals([...mygoals]);
        const result = await checksmspermission();
        if (result && accounts?.UserAccounts?.length) {
          setsmsallow(result);
        }
        swiperRef.current.scrollBy(1, true);
      }
    } catch (error) {}
  };

  const handleSyncUpdate = async val => {
    const data = new FormData();
    data.append('isSync', val);
    const res = await http.put(AUTH.update, data);
    if (res?.data?.success) {
      dispatch(
        setUser({
          ...user,
          isSync: true,
        }),
      );
    }
  };

  const handleSkip = async () => {
    try {
      const result = await checksmspermission();
      handleExtraSms(unmatchedsms);
      if (result) {
        if (user?.isSync) return;
        handleSyncUpdate(true);
      }

      if (result && accounts?.UserAccounts?.length && allTransactions?.length) {
        const filteredSmsArray = allTransactions.filter(sms => {
          return accounts?.UserAccounts?.some(bank => {
            if (
              (compareAccountNumbers(sms?.account_no, bank?.accountID) &&
                bank?.isSync) ||
              (sms?.bankName == bank?.accountName &&
                bank?.isSync &&
                sms?.account_no == undefined)
            ) {
              sms.bankName = bank?.accountName;
              return true;
            }
            return false;
          });
        });

        setloading(true);
        await Promise.all([
          handleAllTransactions(
            filteredSmsArray,
            accounts?.UserAccounts,
            allCategory,
          ),

          setLocalStorage(STORAGE_KEYS.ONBOARDING_PAGE, 'Completed'),
          setLocalStorage(STORAGE_KEYS.SIGNUP_FLOW, 'Yes'),
        ]);

        setloading(false);
        navigation.replace('MyDrawer');
      } else {
        await setLocalStorage(STORAGE_KEYS.ONBOARDING_PAGE, 'ManualAccount');
        await setLocalStorage(STORAGE_KEYS.SIGNUP_FLOW, 'Yes');

        navigation.replace('ManualAccount', {manualflow: 'Yes'});
      }
    } catch (error) {
      console.log('handle skip', error);
    }
  };

  const handleVendorSelection = vendor => {
    if (selectedVendors.includes(vendor)) {
      setSelectedVendors(selectedVendors.filter(item => item !== vendor));
    } else {
      setSelectedVendors([...selectedVendors, vendor]);
    }
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.white,
          justifyContent: 'center',
        }}>
        <ActivityIndicator size={'large'} color={theme.secondary} />
        <CustomText
          textStyle={
            styles.loadingdesc
          }>{`We need a moment to sync your messages`}</CustomText>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Swiper
        loop={false}
        ref={swiperRef}
        nestedScrollEnabled={true}
        style={styles.swiper}
        scrollEnabled={true}
        showsButtons={false}
        dotColor={theme.black}
        dotStyle={styles.dot}
        activeDotStyle={styles.activedot}
        activeDotColor={theme.skyblue}
        pagingEnabled
        onIndexChanged={async index => {
          setinitialIndex(index);
          if (initialIndex == 0) {
            handleAccounts();
          }
          await analytics().logEvent('onboarding', {
            description: `Onboarding page ${index}`,
          });
        }}
        showsPagination={!isKeyboardVisible}>
        {!access && !allBanks?.length ? (
          <View key={'0'} style={styles.slide3}>
            <View style={styles.onboarding}>
              <Image
                source={Images.onboarding}
                resizeMode="cover"
                style={theme.img}
              />
            </View>
            <CustomText numberOfLines={1} textStyle={styles.fetch}>
              Fetch expense data
            </CustomText>
            <CustomText textStyle={styles.fetchdesc}>
              To automatically record your expenses, we need to read your SMS
              notifications. Please grant the relevant permission.
            </CustomText>
            <View style={{...styles.bottomview, bottom: scaleHeight(100)}}>
              <CustomGradient
                title={'Automatically Add Expenses'}
                onPress={requestPermission}
              />
              <CustomText
                onPress={async () => {
                  await analytics().logEvent('onboarding', {
                    description: `Onboarding page 1`,
                  });
                  swiperRef.current.scrollBy(1, true);
                }}
                textStyle={styles.skipfetch}>
                Skip
              </CustomText>
            </View>
          </View>
        ) : null}
        {access && allBanks?.length ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            key={'1'}
            style={styles.slide2}>
            <View style={styles.locker}>
              <Image
                source={Images.locker}
                resizeMode="cover"
                style={theme.img}
              />
            </View>
            <CustomText textStyle={styles.accounts}>
              {allBanks?.length == '1'
                ? `${allBanks?.length} Account Found!`
                : `${allBanks?.length} Accounts Found!`}
            </CustomText>
            <CustomText textStyle={styles.accountdesc}>
              Please select your primary account using the star. Unsync any
              account you wish to keep private. You can always sync accounts
              later.
            </CustomText>
            <FlatList
              style={styles.list}
              contentContainerStyle={styles.listcontainer}
              data={allBanks}
              nestedScrollEnabled={true}
              extraData={primarybank}
              ListHeaderComponent={() => {
                return <CustomText style={styles.banknames}>Sync</CustomText>;
              }}
              renderItem={({item, index}) => {
                return (
                  <BankList
                    key={index}
                    selected={primarybank == item?.accountID ? 'star' : 'staro'}
                    onStar={() => {
                      setprimarybank(item?.accountID);
                      seteditbank(false);
                    }}
                    onEditPress={() => handleEdit(item?.accountID)}
                    bankName={item?.bank}
                    bankIcon={item?.bankIcon}
                    bankNumber={item?.accountID}
                    onChangeText={val => handleOnChange(val, index)}
                    isSync={item?.isSync}
                    editable={editable == item?.accountID && editbank}
                    autoFocus={editable == item?.accountID}
                    onSync={() => handleSync(index)}
                    onBlur={() => {
                      seteditbank(false);
                    }}
                  />
                );
              }}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />
          </ScrollView>
        ) : null}
        <View key={'2'} style={styles.slide3}>
          {access ? (
            <CustomText style={styles.history}>
              Based on your history, we recommend the following categories
            </CustomText>
          ) : (
            <CustomText style={styles.history}>
              Let's set up some categories for your expenses.
            </CustomText>
          )}
          {allCategory?.length ? (
            <FlatList
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: 'space-between',
              }}
              style={styles.categoryView}
              data={allCategory}
              renderItem={({item, index}) => {
                const imagePathRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;

                if (!imagePathRegex.test(item?.icon) && !item?.img) {
                  return (
                    <CustomCategory Category={item?.name} emoji={item?.icon} />
                  );
                } else {
                  return (
                    <CustomCategory
                      Category={item?.name}
                      Icon={item?.icon ? {uri: item?.icon} : item?.img}
                    />
                  );
                }
              }}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <CustomText textStyle={styles.nodata}>
              No Categories Found
            </CustomText>
          )}
          <CustomText
            disabled={allCategory?.length >= 10 ? true : false}
            onPress={handleAddNew}
            textStyle={{
              ...styles.addnew,
              color:
                allCategory?.length >= 10 ? theme.lightgrey : theme.primary,
            }}>
            {'+ Add Category'}
          </CustomText>
          <View style={styles.bottomview}>
            <CustomGradient
              customView={styles.setcategory}
              onPress={async () => {
                await analytics().logEvent('onboarding', {
                  description: `Onboarding page 2`,
                });
                swiperRef.current.scrollBy(1, true);
              }}
              title={'Proceed'}
            />
            <CustomText
              disabled={allCategory?.length >= 10 ? true : false}
              onPress={async () => {
                await analytics().logEvent('onboarding', {
                  description: `Onboarding page 2`,
                });
                swiperRef.current.scrollBy(1, true);
              }}
              textStyle={{
                ...styles.notnow,
                color:
                  allCategory?.length >= 10 ? theme.lightgrey : theme.primary,
              }}>
              Skip for now
            </CustomText>
          </View>

          <Portal>
            <Modal
              style={styles.modalView}
              visible={visible}
              onDismiss={() => setVisible(false)}
              contentContainerStyle={styles.containerStyle}>
              <HeadingCross
                label={'Create Category'}
                onCross={() => setVisible(false)}
              />
              <LabelInput
                label={'Category Name'}
                placeholder={'Write Category Name'}
                value={categoryname}
                onChangeText={setcategoryname}
                customView={styles.modalinput}
              />

              {error?.type == 'categoryname' ? (
                <CustomText textStyle={styles.error}>{error?.msg}</CustomText>
              ) : null}
              <CustomVendors
                vendors={allVendors}
                selectedvendor={selectedVendors}
                handleVendor={val => handleVendorSelection(val)}
                onCross={ind => {
                  const updatedArray = [...selectedVendors];
                  updatedArray.splice(ind, 1);
                  setSelectedVendors(updatedArray);
                }}
              />

              <Portal>
                <Modal
                  style={styles.vendorView}
                  visible={showvendor}
                  onDismiss={() => setshowvendor(false)}
                  contentContainerStyle={styles.vendorContainer}>
                  <Ionicons
                    style={styles.vendorclose}
                    onPress={() => setshowvendor(false)}
                    name="close-sharp"
                    size={24}
                    color={theme.black}
                  />
                  <CustomText
                    textStyle={
                      styles.vendordesc
                    }>{`Which of these vendors should we categorize under ${categoryname}?`}</CustomText>
                  <FlatList
                    style={styles.vendorlist}
                    data={allVendors}
                    renderItem={({item, index}) => {
                      return (
                        <View style={styles.vendorrow}>
                          <Checkbox
                            status={
                              selectedVendors.includes(item)
                                ? 'checked'
                                : 'unchecked'
                            }
                            onPress={() => {
                              handleVendorSelection(item);
                            }}
                            color={theme.skyblue}
                            uncheckedColor={theme.black}
                          />
                          <CustomText
                            textStyle={styles.vendorItem}
                            numberOfLines={1}>
                            {item}
                          </CustomText>
                        </View>
                      );
                    }}
                    keyExtractor={(item, index) => index}
                    showsVerticalScrollIndicator={false}
                  />
                  <CustomButton
                    onPress={() => setshowvendor(false)}
                    title={'Done'}
                    customStyle={styles.done}
                  />
                </Modal>
              </Portal>
              {error?.type == 'vendors' ? (
                <CustomText textStyle={styles.error}>{error?.msg}</CustomText>
              ) : null}
              <CustomText textStyle={styles.selecticon}>
                Select an icon
              </CustomText>
              {allCategoryIcons?.length ? (
                <FlatList
                  numColumns={5}
                  style={styles.iconlist}
                  data={allCategoryIcons}
                  renderItem={({item, index}) => {
                    const imagePathRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;

                    return (
                      <TouchableOpacity
                        onPress={() => setEmojiIcon(item?.Url)}
                        activeOpacity={theme.opacity}
                        style={{
                          ...styles.iconview,
                          backgroundColor:
                            emojiIcon == item?.Url
                              ? theme.brightgreen
                              : theme.offwhite,
                        }}>
                        {imagePathRegex.test(item?.Url) ? (
                          <Image
                            style={{
                              ...styles.img,
                              tintColor:
                                emojiIcon == item?.Url
                                  ? theme.white
                                  : theme.secondary,
                            }}
                            source={{uri: item?.Url}}
                            resizeMode="contain"
                          />
                        ) : (
                          <CustomText textStyle={styles.emoji}>
                            {item?.Url}
                          </CustomText>
                        )}
                      </TouchableOpacity>
                    );
                  }}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index}
                />
              ) : null}
              <CustomText
                onPress={() => setShowEmoji(true)}
                textStyle={styles.viewmore}>
                view more
              </CustomText>
              <Portal>
                <Modal
                  visible={showEmoji}
                  onDismiss={() => setShowEmoji(false)}
                  contentContainerStyle={styles.emojiModal}>
                  <Entypo
                    onPress={() => setShowEmoji(false)}
                    style={styles.cross}
                    name="cross"
                    size={24}
                    color={theme.black}
                  />
                  <EmojiSelector
                    category={Categories.symbols}
                    // style={styles.emojiselector}
                    showSearchBar={false}
                    showSectionTitles={false}
                    onEmojiSelected={emoji => {
                      setEmojiIcon(emoji);
                      setAllCategoryIcons([...allCategoryIcons, {Url: emoji}]);
                      setShowEmoji(false);
                    }}
                  />
                </Modal>
              </Portal>
              {error?.type == 'icon' ? (
                <CustomText textStyle={styles.error}>{error?.msg}</CustomText>
              ) : null}
              <CustomGradient
                customView={styles.setcategory}
                onPress={handleAddCategory}
                title={'Add Category'}
              />
            </Modal>
          </Portal>
        </View>
        <View key={'3'} style={styles.slide3}>
          <View style={styles.goalimg}>
            <Image source={Images.goal} style={theme.img} resizeMode="cover" />
          </View>
          <CustomText textStyle={styles.heading}>
            Let's add your savings goals
          </CustomText>
          <CustomText textStyle={styles.description}>
            {`You can add any financial goals that you want to achieve. For example, “Vacation in Turkey”, Northern Areas Trip, “Buy a New Bike”. You can always add new goals or change existing ones later again. Tap the button below to add a goal.`}
          </CustomText>
          <CustomGradient
            onPress={async () => {
              await analytics().logEvent('onboarding', {
                description: `Onboarding page 3`,
              });
              swiperRef.current.scrollBy(1, true);
            }}
            title={'+ Add New Goal'}
            customView={styles.plus}
          />

          <CustomText onPress={handleSkip} textStyle={styles.skip}>
            Skip for now
          </CustomText>
        </View>
        <View key={'4'} style={styles.slide3}>
          <HeadingCross
            label={'Add New Goal'}
            onCross={() => swiperRef.current.scrollBy(-1, true)}
          />
          <LabelInput
            disabled={true}
            label={'Goal Title'}
            placeholder={'e.g Foreign Trip'}
            value={goal}
            onChangeText={setgoal}
            customView={styles.goaltitle}
          />
          {error?.type == 'goalname' ? (
            <CustomText textStyle={styles.error2}>{error?.msg}</CustomText>
          ) : null}
          <LabelInput
            disabled={true}
            label={'Amount'}
            placeholder={'400,000'}
            value={goalamount}
            onChangeText={val => {
              const numericValue = val?.replace(/[^0-9]/g, '');
              setgoalamount(numericValue);
            }}
            keyboardType={'numeric'}
          />

          {error?.type == 'goalamount' ? (
            <CustomText textStyle={styles.error2}>{error?.msg}</CustomText>
          ) : null}
          <LabelInput
            label={'Goal Start Date'}
            placeholder={'Select Start Date'}
            value={startdate}
            disabled={false}
            editable={false}
            Icon={Images.calendar}
            onPress={() => setstartdatemodal(true)}
          />
          {error?.type == 'startdate' ? (
            <CustomText textStyle={styles.error2}>{error?.msg}</CustomText>
          ) : null}
          <LabelInput
            label={'Goal End Date'}
            placeholder={'Select End Date'}
            value={enddate}
            disabled={false}
            editable={false}
            Icon={Images.calendar}
            onPress={() => setenddatemodal(true)}
          />
          {error?.type == 'enddate' ? (
            <CustomText textStyle={styles.error2}>{error?.msg}</CustomText>
          ) : null}
          <CustomGradient
            title={'Add'}
            onPress={handleAddGoal}
            customView={styles.addgoal}
          />

          <DateTimePickerModal
            minimumDate={new Date()}
            isVisible={startdatemodal}
            mode="date"
            onConfirm={date => handleStartDate(date)}
            onCancel={() => setstartdatemodal(false)}
          />
          <DateTimePickerModal
            minimumDate={new Date()}
            isVisible={enddatemodal}
            mode="date"
            onConfirm={date => handleEndDate(date)}
            onCancel={() => setenddatemodal(false)}
          />
        </View>
        {myGoals?.length ? (
          <View key={'5'} style={styles.slide3}>
            <CustomText textStyle={styles.currentgoals}>
              Your current goals
            </CustomText>
            <FlatList
              style={styles.goalslist}
              data={myGoals}
              renderItem={({item, index}) => {
                const result =
                  item?.currentAmount > 0
                    ? item?.currentAmount / item?.targetAmount
                    : 0;
                const progress = result > 1 ? 1 : result;
                return (
                  <CustomProgress
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
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />
            <CustomGradient
              titleColor={theme.primary}
              customView={styles.newgoal}
              gradientstyle={styles.gradient}
              onPress={handleGoBack}
              title={'+ Add New Goal'}
            />

            <CustomGradient
              onPress={handleSkip}
              title={smsallow ? 'Go to Dashboard' : 'Next'}
            />
          </View>
        ) : null}
      </Swiper>
    </View>
  );
};

export default OnBoarding;
