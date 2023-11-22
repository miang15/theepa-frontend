import {
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from './styles';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import theme from '../../../utils/theme';
import CustomText from '../../../components/CustomText/CustomText';
import {
  BackButton,
  CustomGradient,
  HeadingCross,
  LabelInput,
} from '../../../components';
import {Modal, Portal, RadioButton} from 'react-native-paper';
import EmojiSelector, {Categories} from 'react-native-emoji-selector';
import CustomButton from '../../../components/CustomButton/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  addAccountAction,
  getCategoryAction,
} from '../../../redux/Dashboard/DashboardAction';
import {useRoute} from '@react-navigation/native';
import {
  checksmspermission,
  compareAccountNumbers,
  getDeviceSms,
  handleExtraSms,
  requestSmsPermission,
  setLocalStorage,
} from '../../../constants/functions';
import {AUTH, STORAGE_KEYS} from '../../../config/endpoint';
import {padding} from '../../../utils/Layout';
import {setAppLoading} from '../../../redux/AppLoader/appLoaderAction';
import {showMessage} from 'react-native-flash-message';
import http from '../../../config/http';
import {
  getAllRegexAction,
  setAllBankSms,
} from '../../../redux/SMSParsing/SMSParsingAction';
import {
  BankKeywords,
  allBankIcons,
  ignoreNumbers,
} from '../../../DummyData/DummyData';
import LinearGradient from 'react-native-linear-gradient';
import analytics from '@react-native-firebase/analytics';
import {AllRegex} from '../../../DummyData/AllRegex';
import {getProfileAction, setUser} from '../../../redux/Auth/authAction';

const ManualAccount = ({navigation}) => {
  const route = useRoute();
  const screen = route?.params?.manualflow;
  const allBanksRegex = useSelector(
    state => state?.SMSParsingReducer?.allBanksRegex,
  );
  const user = useSelector(state => state?.auth?.user);

  const accounts = useSelector(state => state?.DashboardReducer?.accounts);
  const [showEmoji, setShowEmoji] = useState(false);
  const [emojiIcon, setEmojiIcon] = useState('');
  const [name, setname] = useState('');
  const [account, setaccount] = useState('');
  const [amount, setamount] = useState('');
  const [showsync, setshowsync] = useState(false);
  const [checked, setChecked] = useState('');
  const [selectedbank, setselectedbank] = useState('');
  const [banks, setbanks] = useState([]);
  const [icons, seticons] = useState(allBankIcons);

  const [error, seterror] = useState({
    type: '',
    msg: '',
  });

  const dispatch = useDispatch();
  const bankNameCount = {};

  const countMatchingKeywords = sms => {
    const smsWords = sms.toLowerCase().split(/\W+/);
    let matchCount = 0;

    BankKeywords.forEach(keyword => {
      if (smsWords?.includes(keyword)) {
        matchCount++;
      }
    });

    return matchCount;
  };

  useEffect(() => {
    const checkSyncing = async () => {
      if (screen) {
        const result = await checksmspermission();
        if (result) {
          if (user?.isSync) return;
          handleSyncUpdate(true);
        }
      }
    };

    dispatch(getCategoryAction());
    if (user?.isSync) {
      dispatch(getAllRegexAction());
    }
    checkSyncing();
  }, []);

  const handleAddAccount = async () => {
    try {
      seterror({type: '', msg: ''});
      if (!name.toString().trim())
        return seterror({type: 'name', msg: 'Bank Name is Required'});
      if (!account.toString().trim())
        return seterror({type: 'account', msg: 'Account Number is Required'});
      if (!amount.toString().trim())
        return seterror({type: 'amount', msg: 'Amount is Required'});
      if (!emojiIcon) return seterror({type: 'icon', msg: 'Icon is Required'});
      dispatch(setAppLoading(true));
      const data = {
        accountID: account,
        accountName: name,
        amount: amount,
        Icon: emojiIcon,
        isManual: true,
      };
      const result = await dispatch(addAccountAction(data));
      dispatch(setAppLoading(false));
      setChecked('');
      await analytics().logEvent('manual_account_creation', {
        description: 'Account created manually',
      });
      if (screen && result) {
        setLocalStorage(STORAGE_KEYS.ONBOARDING_PAGE, 'Completed');
        navigation.replace('MyDrawer');
      } else {
        navigation.goBack();
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

  const getModifiedBankName = bankName => {
    if (bankNameCount[bankName]) {
      bankNameCount[bankName]++;
      return `${bankName} ${bankNameCount[bankName]}`;
    } else {
      bankNameCount[bankName] = 1;
      return bankName;
    }
  };

  const getSmsPermission = async () => {
    try {
      const result = await checksmspermission();
      if (result) {
        if (!user?.isSync && screen) {
          handleSyncUpdate(true);
        }

        syncMessage();
      } else {
        const grant = await requestSmsPermission();
        if (grant == 'granted') {
          if (!user?.isSync && screen) {
            handleSyncUpdate(true);
          }
          syncMessage();
        } else {
          showMessage({
            message: 'Failed',
            description: 'sms permission denied',
            type: 'danger',
            duration: 1500,
          });
        }
      }
    } catch (error) {
      console.log('sms permission: ', error);
    }
  };
  const syncMessage = async () => {
    dispatch(setAppLoading(true));
    const sms = await getDeviceSms();
    let extraSms = [];
    let checked = [];
    if (sms?.length) {
      let banksms = [];

      sms.forEach((item, index) => {
        allBanksRegex?.forEach(val => {
          if (
            val?.bankNumber?.includes(Number(item?.address?.replace(/^\+/, '')))
          ) {
            const date = new Date(item?.date);
            const formattedDate = date.toLocaleDateString();
            const formattedTime = date.toLocaleTimeString();

            banksms.push({
              address: item?.address,
              body: item?.body,
              date: formattedDate,
              time: formattedTime,
              bankIcon: val?.bankIcon,
              timestamp: item?.date.toString(),
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
              bank?.bankNumber?.includes(
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
            // const numericValue = item?.account_no.replace(/[^0-9]/g, '');
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

          const uniqueBanks = sortedSmsArray
            .reverse()
            .reduce((unique, current) => {
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

            uniqueBanks?.forEach(async (item, index) => {
              // const numericValue = item?.account_no?.replace(/[^0-9]/g, '');
              const modifiedBankName = getModifiedBankName(item?.bankName);

              arr.push({
                accountName: modifiedBankName,
                isSync: false,
                amount: item?.remaining_balance,
                bankIcon: item?.bankIcon,
                accountID: item?.account_no, //account no
              });
            });

            if (accounts?.UserAccounts?.length) {
              arr.forEach(item => {
                const existingNameIndex = accounts?.UserAccounts?.findIndex(
                  existingItem =>
                    existingItem?.accountName === item?.accountName,
                );

                if (existingNameIndex !== -1) {
                  item.accountName = getModifiedBankName(item?.accountName);
                }
              });
            }

            const bankNames1 = arr?.map(bank => bank?.accountID);
            const bankNames2 = accounts?.UserAccounts?.map(
              bank => bank.accountID,
            );

            const shouldRenderFlatList = bankNames1.some(
              bankName => !bankNames2?.includes(bankName),
            );

            await dispatch(setAppLoading(false));
            if (shouldRenderFlatList) {
              let banks = arr?.filter(
                item => !bankNames2?.includes(item?.accountID),
              );

              navigation.replace('SyncAccount', {
                banksData: banks,
                manualflow: screen || undefined,
              });
            } else {
              showMessage({
                message: 'Alert',
                description: 'Your banks already synced',
                type: 'info',
                duration: 2000,
              });
            }
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
        await analytics().logEvent('unmatched_address', {
          description: 'SMS Number not matched with our database bank numbers.',
        });
      }
    } else {
      showMessage({
        message: 'Alert',
        description: 'No SMS found',
        type: 'info',
        duration: 1500,
      });
      await analytics().logEvent('no_sms_found', {
        description: 'Device sms not fetched',
      });
    }
    if (extraSms) {
      handleExtraSms(extraSms);
    }
    setTimeout(() => {
      dispatch(setAppLoading(false));
    }, 500);
  };

  const handleSelectAccount = async () => {
    try {
      seterror({type: '', msg: ''});
      if (!selectedbank) {
        seterror({type: 'select', msg: 'Select any Bank'});
      } else {
        setname(selectedbank?.accountName);
        setaccount(selectedbank?.accountID);
        setamount(selectedbank?.amount.toString());
        setshowsync(false);
      }
    } catch (error) {
      console.log('select account: ', error);
    }
  };

  return (
    <View style={styles.container}>
      {!screen ? <BackButton onPress={() => navigation.goBack()} /> : null}
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <HeadingCross hideCross={true} label={'Add New Account'} />
        <LabelInput
          label={'Bank Name'}
          placeholder={'Add bank name'}
          value={name}
          onChangeText={setname}
          customView={styles.input}
        />
        {error?.type == 'name' ? (
          <CustomText textStyle={styles.error}>{error?.msg}</CustomText>
        ) : null}
        <LabelInput
          label={'Account Number'}
          placeholder={'Add account number'}
          value={account}
          onChangeText={setaccount}
          customView={styles.input}
        />

        {error?.type == 'account' ? (
          <CustomText textStyle={styles.error}>{error?.msg}</CustomText>
        ) : null}
        <LabelInput
          label={'Amount'}
          placeholder={'Add account balance'}
          value={amount}
          onChangeText={val => {
            const numericValue = val.replace(/[^0-9]/g, '');
            setamount(numericValue);
          }}
          keyboardType={'numeric'}
          customView={styles.input}
        />

        {error?.type == 'amount' ? (
          <CustomText textStyle={styles.error}>{error?.msg}</CustomText>
        ) : null}
        <CustomText textStyle={styles.selecticon}>Select an icon</CustomText>
        {icons?.length ? (
          <FlatList
            nestedScrollEnabled
            numColumns={5}
            style={styles.iconlist}
            data={icons}
            renderItem={({item, index}) => {
              const imagePathRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => setEmojiIcon(item)}
                  activeOpacity={theme.opacity}
                  style={{
                    ...styles.iconview,
                    backgroundColor:
                      emojiIcon == item
                        ? theme.brightgreen
                        : emojiIcon == item?.emoji
                        ? theme.brightgreen
                        : theme.offwhite,
                  }}>
                  {!item?.emoji ? (
                    <Image
                      style={{
                        ...styles.img,
                      }}
                      source={{uri: item}}
                      resizeMode="contain"
                    />
                  ) : (
                    <CustomText textStyle={styles.emoji}>
                      {item?.emoji}
                    </CustomText>
                  )}
                </TouchableOpacity>
              );
            }}
            showsVerticalScrollIndicator={true}
            keyExtractor={(item, index) => index}
          />
        ) : null}
        {/* <CustomText
          onPress={() => setShowEmoji(true)}
          textStyle={styles.viewmore}>
          view more
        </CustomText> */}

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
              category={Categories.places}
              showSearchBar={false}
              showSectionTitles={false}
              onEmojiSelected={emoji => {
                seticons([...icons, {emoji: emoji}]);
                setEmojiIcon(emoji);
                setShowEmoji(false);
              }}
            />
          </Modal>
        </Portal>
        {error?.type == 'icon' ? (
          <CustomText textStyle={styles.error}>{error?.msg}</CustomText>
        ) : null}
        <LinearGradient
          colors={theme.gradientcolors}
          start={theme.start}
          end={theme.end}
          style={styles.syncbutton}>
          <TouchableOpacity
            activeOpacity={theme.opacity}
            onPress={getSmsPermission}
            style={styles.row}>
            <Feather name="refresh-ccw" size={20} color={theme.primary} />
            <CustomText textStyle={styles.sync}>
              Sync account from SMS
            </CustomText>
          </TouchableOpacity>
        </LinearGradient>
        <CustomGradient onPress={handleAddAccount} title={'+ Add Account'} />
      </ScrollView>
      <Portal>
        <Modal
          visible={showsync}
          onDismiss={() => setshowsync(false)}
          contentContainerStyle={styles.syncmodal}>
          <View style={{flex: 1}}>
            <Entypo
              onPress={() => setshowsync(false)}
              name="cross"
              size={24}
              color={theme.black}
              style={styles.close}
            />
            <CustomText textStyle={styles.desc}>
              {`We have found ${banks?.length} unsynced accounts while syncing. which account would you like to sync?`}
            </CustomText>

            <FlatList
              style={styles.list}
              contentContainerStyle={{...padding(10, 0, 10, 0)}}
              data={banks}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setChecked(item?.accountName);
                      setselectedbank(item);
                    }}
                    style={styles.modalrow}>
                    <RadioButton
                      value={item?.accountName}
                      status={
                        checked === item?.accountName ? 'checked' : 'unchecked'
                      }
                      onPress={() => {
                        setChecked(item?.accountName);
                        setselectedbank(item);
                      }}
                      color={theme.skyblue}
                      uncheckedColor={theme.black}
                      TouchableRipple={1}
                    />
                    <CustomText numberOfLines={1}>
                      {item?.accountName}
                    </CustomText>
                  </TouchableOpacity>
                );
              }}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
            />
            {error?.type == 'select' ? (
              <CustomText textStyle={styles.error}>{error?.msg}</CustomText>
            ) : null}
            <CustomButton title={'Select'} onPress={handleSelectAccount} />
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default ManualAccount;
