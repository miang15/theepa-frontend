import {
  FlatList,
  TouchableOpacity,
  ScrollView,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {
  AllAccounts,
  CashFlow,
  CategoryCard,
  CustomGoals,
  CustomGradient,
  DrawerHeader,
  ExpenseStructure,
  HeadingCross,
  IncomeStructure,
  LabelInput,
  MyBudgets,
} from '../../components';
import CustomText from '../../components/CustomText/CustomText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import theme from '../../utils/theme';
import {Modal, Portal} from 'react-native-paper';
import http from '../../config/http';
import {AUTH, STORAGE_KEYS} from '../../config/endpoint';
import {useDispatch, useSelector} from 'react-redux';
import {
  editAccountAction,
  getDashboardAction,
} from '../../redux/Dashboard/DashboardAction';
import {
  checksmspermission,
  compareAccountNumbers,
  getDeviceSms,
  getLocalStorage,
  removeLocalStorage,
  requestSmsPermission,
  setLocalStorage,
} from '../../constants/functions';
import {showMessage} from 'react-native-flash-message';
import MydashboardHistory from '../../components/MydashboardHistory/MydashboardHistory';

import Images from '../../constants/Images';
import CustomGradientIncomeExpense from '../../components/CustomGradientIncomeExpense/CustomGradientIncomeExpense';
import {margin, scaleFont, scaleHeight, scaleWidth} from '../../utils/Layout';
import {
  setAppLoading,
  setAppToast,
} from '../../redux/AppLoader/appLoaderAction';
import {
  setAllBankSms,
  setUncategorizedTransactions,
} from '../../redux/SMSParsing/SMSParsingAction';
import {handleGoalsStatus} from '../../constants/GoalsFunctions';
import {handleBudgetStatus} from '../../constants/BudgetFunctions';
import {getNewSms} from '../../constants/NewSmsTransaction';
import LinearGradient from 'react-native-linear-gradient';
import Tooltip from 'react-native-walkthrough-tooltip';
import analytics from '@react-native-firebase/analytics';
import {AllRegex} from '../../DummyData/AllRegex';
import {getProfileAction} from '../../redux/Auth/authAction';
import {getGoalsAction} from '../../redux/Goals/GoalsAction';

const Dashboard = ({navigation}) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [prompt, setprompt] = useState(false);
  const allCategory = useSelector(state => state?.DashboardReducer?.category);
  const [loading, setloading] = useState(true);

  const allBanksRegex = useSelector(
    state => state?.SMSParsingReducer?.allBanksRegex,
  );
  const uncategorizeTransactions = useSelector(
    state => state?.SMSParsingReducer?.uncategorizeTransactions,
  );
  const user = useSelector(state => state?.auth?.user);
  const dashboardData = useSelector(
    state => state?.DashboardReducer?.dashboard,
  );
  const accounts = useSelector(state => state?.DashboardReducer?.accounts);
  const [showplus, setshowplus] = useState(true);
  const [manualpopup, setmanualpopup] = useState(false);
  const [selected, setselected] = useState('All');
  const [cashflowfilter, setcashflowfilter] = useState('');
  const [budgetfilter, setbudgetfilter] = useState('');
  const [goalsfilter, setgoalsfilter] = useState('');
  const [expensefilter, setexpensefilter] = useState('');
  const [incomefilter, setincomefilter] = useState('');
  const [currentIndex, setcurrenIndex] = useState(0);
  const [banks, setbanks] = useState(false);
  const [allSynced, setallSynced] = useState(false);
  const [showinfo, setshowinfo] = useState(false);
  const [uncategorizeData, setUncategorizeData] = useState([]);
  const [showall, setshowall] = useState(false);
  const [selectedaccount, setselectedaccount] = useState();
  const [editbalance, seteditbalance] = useState(false);
  const [accountbalance, setaccountbalance] = useState('');
  const [error, seterror] = useState('');
  const bankNameCount = {};

  useEffect(() => {
    setloading(false);
    const focusListener = navigation.addListener('focus', async () => {
      await dispatch(getDashboardAction());
      setselected('All');
      setselectedaccount('');
    });

    const fetchData = async () => {
      dispatch(getProfileAction()),
        dispatch(getGoalsAction()),
        setTimeout(async () => {
          await handlePrompts();
          setTimeout(() => {
            setloading(false);
          }, 3000);
        }, 1000);
    };

    fetchData();

    return () => {
      focusListener();
    };
  }, []);

  useEffect(() => {
    if (accounts?.UserAccounts && allCategory?.length && banks) {
      handleAccountSyncing();
    }
  }, [accounts, allCategory, banks]);

  useEffect(() => {
    const handleUncategorizeData = async () => {
      if (uncategorizeTransactions?.length && allSynced) {
        if (!user?.UnCategorizedTransactionNotifications) {
          if (uncategorizeData?.length) return;
          dispatch(setAppLoading(true));
          setUncategorizeData(uncategorizeTransactions);
          await analytics().logEvent('categorize_new_transaction', {
            description: 'Categorized new sms',
          });
          dispatch(setAppLoading(false));
          setshowinfo(true);
        }
      }
    };

    handleUncategorizeData();
  }, [uncategorizeTransactions]);

  const handleAccountSyncing = async () => {
    try {
      if (user?.isSync) {
        await getSmsPermission();
      }
      const signupflow = await getLocalStorage(STORAGE_KEYS.SIGNUP_FLOW);
      if (signupflow) {
        await removeLocalStorage(STORAGE_KEYS.SIGNUP_FLOW);
      } else {
        setTimeout(async () => {
          await handleGoalsStatus(user?.BudgetndGoalsNotification);
          await handleBudgetStatus(user?.BudgetndGoalsNotification);
          if (user?.isSync) {
            const result = await checksmspermission();
            if (result) {
              const hasSyncAccount = accounts?.UserAccounts.some(
                obj => obj?.isManual === false,
              );
              if (hasSyncAccount) {
                await getNewSms(allBanksRegex, accounts, allCategory);
                setallSynced(true);
              }
            }
          }
          setbanks(false);
        }, 500);
      }
    } catch (error) {
      console.log('account syncing: ', error);
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
        const hasSyncAccount = accounts?.UserAccounts.some(
          obj => obj?.isManual === false,
        );

        if (hasSyncAccount) return;
        syncMessage();
      } else {
        const grant = await requestSmsPermission();
        if (grant == 'granted') {
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
      console.log('sms permission error', error);
    }
  };

  const syncMessage = async () => {
    const sms = await getDeviceSms();
    if (sms?.length) {
      dispatch(setAppLoading(true));
      let banksms = [];

      sms.forEach(item => {
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
              timestamp: item?.date.toString(),
              bankIcon: val?.bankIcon,
            });
          }
        });
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
                if (matched) {
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

            const bankNames1 = arr?.map(bank => bank?.accountID);
            const bankNames2 = accounts?.UserAccounts?.map(
              bank => bank.accountID,
            );

            const shouldRenderFlatList = bankNames1.some(
              bankName => !bankNames2?.includes(bankName),
            );

            if (shouldRenderFlatList) {
              let banks = arr?.filter(
                item => !bankNames2?.includes(item?.accountID),
              );

              await setLocalStorage(STORAGE_KEYS.SYNCED_DASHBOARD, 'Yes');

              navigation.navigate('SyncAccount', {
                banksData: banks,
              });
            }
          }
        }
      }
      dispatch(setAppLoading(false));
    }
  };

  useEffect(() => {
    handleDashboardFilter();
  }, [
    selected,
    cashflowfilter,
    budgetfilter,
    goalsfilter,
    expensefilter,
    incomefilter,
  ]);

  const handlePrompts = async () => {
    const signupflow = await getLocalStorage(STORAGE_KEYS.SIGNUP_FLOW);
    if (signupflow) {
      if (accounts?.UserAccounts?.length) {
        setVisible(true);
      } else {
        // setprompt(true);
        setmanualpopup(true);
      }
      dispatch(setAppLoading(false));
      await setLocalStorage(STORAGE_KEYS.CATEGORY_PROMPT, 'Yes');
    } else {
      setbanks(true);
    }
  };

  const handleAddAccount = async () => {
    try {
      navigation.navigate('ManualAccount');
    } catch (error) {}
  };

  const handleDashboardFilter = async () => {
    let link =
      selected && selected !== 'All'
        ? `dashboard/?accountid=${selected}`
        : `dashboard/?limit=0`;

    if (cashflowfilter) {
      link += `&cashflow=${cashflowfilter.toLowerCase()}`;
    }
    if (goalsfilter) {
      link += `&goalssort=${goalsfilter.toLowerCase()}`;
    }
    if (budgetfilter) {
      link += `&budget=${budgetfilter.toLowerCase()}`;
    }
    if (expensefilter) {
      link += `&expensestructure=${expensefilter.toLowerCase()}`;
    }
    if (incomefilter) {
      link += `&incomestructure=${incomefilter.toLowerCase()}`;
    }
    dispatch(setAppLoading(true));
    await dispatch(getDashboardAction(link));
    dispatch(setAppLoading(false));
    await analytics().logEvent('dashboard_filters', {
      description: 'Filter dashboard data',
    });
  };

  const handleUncategorizeTransaction = async val => {
    dispatch(setAppLoading(true));
    const data = {
      category: val?._id,
    };
    const res = await http.put(
      `categories/update-uncategorized-transaction/${uncategorizeData[currentIndex]?._id}`,
      data,
    );
    if (res?.data?.success) {
      setshowinfo(false);
      dispatch(
        setAppToast({
          title: 'Success!!!',
          description: 'Transaction successfully Categorized',
          status: 'success',
          showToast: true,
        }),
      );
    }

    if (currentIndex + 1 < uncategorizeData?.length) {
      setcurrenIndex(currentIndex + 1);
      setshowinfo(true);
    } else {
      setshowinfo(false);
      setUncategorizeData([]);
      dispatch(setUncategorizedTransactions([]));
    }
    dispatch(setAppLoading(false));
  };

  const handleUpdateBalance = async () => {
    seterror('');

    if (!accountbalance?.toString().trim()) {
      seterror('Balance amount is Required');
    } else if (accountbalance == selectedaccount?.amount) {
      seteditbalance(false);
    } else {
      const data = {
        amount: accountbalance,
      };
      dispatch(setAppLoading(true));
      const result = await dispatch(
        editAccountAction(data, selectedaccount?._id),
      );
      await handleDashboardFilter();
      await analytics().logEvent('account_balance_update', {
        description: `Balance update of manual account`,
        value: accountbalance,
      });
      if (result) {
        dispatch(
          setAppToast({
            title: 'Success!!!',
            description: 'Account Balance Updated',
            status: 'success',
            showToast: true,
          }),
        );
      }
      seteditbalance(false);
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
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <DrawerHeader />
      <Tooltip
        contentStyle={styles.content}
        parentWrapperStyle={styles.accountwrapper}
        isVisible={visible}
        arrowStyle={{
          marginTop: scaleHeight(0),
        }}
        childContentSpacing={0}
        placement={'bottom'}
        content={
          <View>
            <AntDesign
              onPress={() => {
                setVisible(false);
                // setprompt(true);
                setmanualpopup(true);
              }}
              style={styles.cross}
              name="closecircleo"
              size={18}
              color="black"
            />
            <CustomText
              textStyle={{
                fontSize: scaleFont(15),
              }}>{`Select the bank account that you would like to view from this list.`}</CustomText>
          </View>
        }
        onClose={() => {
          setVisible(false);
          setmanualpopup(true);
        }}>
        <AllAccounts
          data={accounts?.UserAccounts}
          selected={selected}
          onPress={(val, acc) => {
            setselected(val);
            setselectedaccount(acc);
          }}
          onPressAll={val => setselected(val)}
          onPlus={handleAddAccount}
        />
      </Tooltip>

      <View style={styles.balancerow}>
        <CustomText
          numberOfLines={1}
          textStyle={
            styles.balance
          }>{`Accounts Balance: PKR ${dashboardData?.userBalance}`}</CustomText>
        {selectedaccount?.isManual ||
        selectedaccount?.accountName == 'MCB Bank' ? (
          <AntDesign
            onPress={() => {
              setaccountbalance(dashboardData?.userBalance?.toString());
              seteditbalance(true);
            }}
            name="edit"
            size={20}
            color={theme.secondary}
          />
        ) : null}
      </View>
      <ScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        {dashboardData?.userData?.categories?.length ? (
          <View style={styles.row}>
            <CustomText textStyle={styles.expense}>
              This months expenses:
            </CustomText>
            <CustomText
              onPress={async () => {
                navigation.navigate('CategoryStackScreens');
                await analytics().logEvent('functionality', {
                  description: 'dashboard to all category screen',
                });
              }}
              textStyle={styles.more}>
              View more
            </CustomText>
          </View>
        ) : null}

        {dashboardData?.userData?.categories?.length ? (
          <Tooltip
            contentStyle={styles.content}
            parentWrapperStyle={styles.accountwrapper}
            isVisible={prompt}
            onClose={() => setprompt(false)}
            arrowStyle={{
              marginTop: scaleHeight(0),
            }}
            childContentSpacing={0}
            placement={'bottom'}
            content={
              <View>
                <AntDesign
                  onPress={() => {
                    setprompt(false);
                    setmanualpopup(true);
                  }}
                  style={styles.cross}
                  name="closecircleo"
                  size={18}
                  color="black"
                />
                <CustomText
                  textStyle={{
                    fontSize: scaleFont(15),
                  }}>{`You can long press on any card and drag it to your preferred position.`}</CustomText>
              </View>
            }>
            <FlatList
              nestedScrollEnabled
              style={styles.expenselist}
              data={dashboardData?.userData?.categories?.slice(0, 6)}
              numColumns={3}
              columnWrapperStyle={{alignSelf: 'center'}}
              renderItem={({item, index}) => {
                const imagePathRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
                const result =
                  item?.budgets[0]?.spend > 0 && item?.budgets[0]?.amount > 0
                    ? item?.budgets[0]?.spend / item?.budgets[0]?.amount
                    : 0;
                const progress = result > 1 ? 1 : result;
                if (!imagePathRegex.test(item?.icon)) {
                  return (
                    <CategoryCard
                      onPress={async () => {
                        await analytics().logEvent('functionality', {
                          description: 'dashboard to category details',
                        });
                        navigation.navigate('CategoryDetails', {details: item});
                      }}
                      spent={
                        item?.budgets?.length
                          ? item?.budgets[0]?.spend
                          : item?.spend
                      }
                      key={index}
                      category={item?.name}
                      emoji={item?.icon}
                      budget={item?.budgets[0]?.amount || null}
                      progress={progress}
                    />
                  );
                }
                return (
                  <CategoryCard
                    onPress={async () => {
                      await analytics().logEvent('functionality', {
                        description: 'dashboard to category details',
                      });
                      navigation.navigate('CategoryDetails', {details: item});
                    }}
                    budget={item?.budgets[0]?.amount || null}
                    progress={progress}
                    key={index}
                    spent={
                      item?.budgets?.length
                        ? item?.budgets[0]?.spend
                        : item?.spend
                    }
                    category={item?.name}
                    Icon={{uri: item?.icon}}
                  />
                );
              }}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index}
            />
          </Tooltip>
        ) : (
          <CustomText textStyle={styles.nodata}>
            No Categories Available
          </CustomText>
        )}
        {dashboardData?.userData?.cashflow ? (
          Object.keys(dashboardData?.userData?.cashflow).length > 0 ? (
            <CashFlow
              checked={cashflowfilter}
              setChecked={val => {
                if (cashflowfilter == val) {
                  setcashflowfilter('');
                } else {
                  setcashflowfilter(val);
                }
              }}
              heading={'Cash Flow'}
              label1={'Income'}
              label2={'Expense'}
              value1={dashboardData?.userData?.cashflow?.income}
              value2={dashboardData?.userData?.cashflow?.expense}
              progress1={
                user?.balance > 0 &&
                dashboardData?.userData?.cashflow?.income > 0
                  ? dashboardData?.userData?.cashflow?.income / user?.balance
                  : 0
              }
              progress2={
                user?.balance > 0 &&
                dashboardData?.userData?.cashflow?.expense > 0
                  ? dashboardData?.userData?.cashflow?.expense /
                    dashboardData?.userData?.cashflow?.income
                  : 0
              }
            />
          ) : null
        ) : null}

        {dashboardData?.userData?.goals ? (
          <CustomGoals
            checked={goalsfilter}
            setChecked={val => {
              if (goalsfilter == val) {
                setgoalsfilter('');
              } else {
                setgoalsfilter(val);
              }
            }}
            progressData={dashboardData?.userData?.goals}
          />
        ) : null}

        {dashboardData?.userData?.expense ? (
          <ExpenseStructure
            checked={expensefilter}
            setChecked={val => {
              if (expensefilter == val) {
                setexpensefilter('');
              } else {
                setexpensefilter(val);
              }
            }}
            chartData={dashboardData?.userData?.expense}
          />
        ) : null}
        {dashboardData?.userData?.income ? (
          <IncomeStructure
            checked={incomefilter}
            setChecked={val => {
              if (incomefilter == val) {
                setincomefilter('');
              } else {
                setincomefilter(val);
              }
            }}
            chartData={dashboardData?.userData?.income}
          />
        ) : null}

        {dashboardData?.userData?.budget ? (
          <MyBudgets
            checked={budgetfilter}
            setChecked={val => {
              if (budgetfilter == val) {
                setbudgetfilter('');
              } else {
                setbudgetfilter(val);
              }
            }}
            progressData={dashboardData?.userData?.budget}
          />
        ) : null}

        {dashboardData?.userData?.history ? (
          <MydashboardHistory
            hideshow={dashboardData?.userData?.history?.length < 5}
            progressData={dashboardData?.userData?.history}
            onPress={() => navigation.navigate('History')}
          />
        ) : null}

        <CustomText
          onPress={() => navigation.navigate('AllWidgets')}
          textStyle={styles.addmore}>
          Add more Cards
        </CustomText>
      </ScrollView>
      <Tooltip
        contentStyle={styles.content}
        parentWrapperStyle={styles.wrapper}
        isVisible={manualpopup}
        arrowStyle={{
          marginTop: scaleHeight(-9),

          marginLeft: scaleWidth(-5),
        }}
        childContentSpacing={0}
        content={
          <View>
            <AntDesign
              onPress={() => {
                setmanualpopup(false);
                setbanks(true);
              }}
              style={styles.cross}
              name="closecircleo"
              size={18}
              color="black"
            />
            <CustomText
              textStyle={{
                fontSize: scaleFont(15),
              }}>{`You do not seem to have any transactions recorded. Tap the “+” button to add an income/ expense.`}</CustomText>
          </View>
        }
        onClose={() => {
          setmanualpopup(false);
          setbanks(true);
        }}>
        <TouchableOpacity
          onPress={() => setshowplus(false)}
          activeOpacity={1}
          style={styles.plusButton}>
          <LinearGradient
            colors={theme.gradientcolors}
            start={theme.start}
            end={theme.end}
            style={styles.gradientplus}>
            <Feather name="plus" size={30} color={theme.white} />
          </LinearGradient>
        </TouchableOpacity>
      </Tooltip>

      <Portal>
        <Modal
          dismissable={true}
          visible={!showplus}
          onDismiss={() => {
            setshowplus(true);
          }}
          contentContainerStyle={styles.incomemodal}>
          <CustomGradientIncomeExpense
            onPress={async () => {
              setshowplus(true);
              navigation.navigate('AddIncome');
              await analytics().logEvent('manualIncome', {
                description: 'navigate to add income',
              });
            }}
            title={'Add Income'}
            imgsrc={Images.addincomeicon}
          />
          <CustomGradientIncomeExpense
            onPress={async () => {
              setshowplus(true);
              navigation.navigate('AddExpense');
              await analytics().logEvent('manualExpense', {
                description: 'navigate to add expense',
              });
            }}
            title={'Add Expense'}
            imgsrc={Images.addexpenseicon}
          />
        </Modal>
      </Portal>

      <Portal>
        <Modal
          visible={showinfo}
          onDismiss={() => {
            setshowinfo(false);
            setUncategorizeData([]);
            dispatch(setUncategorizedTransactions([]));
          }}
          contentContainerStyle={styles.modal3}>
          <View
            style={{
              backgroundColor: theme.offwhite,
              padding: 10,
              paddingVertical: 20,
              borderRadius: 10,
            }}>
            {uncategorizeData[currentIndex]?.location &&
            uncategorizeData[currentIndex]?.location !== undefined ? (
              <CustomText
                style={{
                  fontFamily: theme.sandregular,
                  color: theme.darkestgray,
                }}>
                {`There was an unrecognized transaction at ${uncategorizeData[currentIndex]?.location}. Please select an option to categorize it.`}
              </CustomText>
            ) : (
              <CustomText
                style={{
                  fontFamily: theme.sandregular,
                  color: theme.darkestgray,
                }}>
                {`There was an unrecognized transaction of ${uncategorizeData[currentIndex]?.amount}. Please select an option to categorize it.`}
              </CustomText>
            )}

            {dashboardData?.userData?.categories?.length ? (
              <FlatList
                numColumns={4}
                style={styles.iconlist}
                data={
                  showall
                    ? dashboardData?.userData?.categories
                    : dashboardData?.userData?.categories?.slice(0, 4)
                }
                renderItem={({item, index}) => {
                  const imagePathRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        handleUncategorizeTransaction(item);
                      }}
                      style={styles.categoryview}
                      activeOpacity={theme.opacity}>
                      <View
                        style={{
                          ...styles.iconview,
                        }}>
                        {imagePathRegex.test(item?.icon) ? (
                          <Image
                            style={{
                              ...styles.img,
                              tintColor: theme.secondary,
                            }}
                            source={{uri: item?.icon}}
                            resizeMode="contain"
                          />
                        ) : (
                          <CustomText textStyle={styles.emoji}>
                            {item?.icon}
                          </CustomText>
                        )}
                      </View>
                      <CustomText numberOfLines={1} textStyle={styles.category}>
                        {item?.name}
                      </CustomText>
                    </TouchableOpacity>
                  );
                }}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index}
              />
            ) : null}
            <View
              style={{
                flexDirection: 'row',
                ...margin(10, 0, 0, 0),
                justifyContent: 'flex-end',
              }}>
              <CustomText
                onPress={async () => {
                  if (currentIndex + 1 < uncategorizeData?.length) {
                    setcurrenIndex(currentIndex + 1);
                  } else {
                    setshowinfo(false);
                    setUncategorizeData([]);
                    dispatch(setUncategorizedTransactions([]));
                  }
                }}
                textStyle={{
                  ...styles.more,

                  ...margin(0, 10, 0, 0),
                }}>
                Skip
              </CustomText>
              <CustomText
                onPress={() => setshowall(!showall)}
                textStyle={{
                  ...styles.more,
                }}>
                {showall ? `Show less categories` : `Show all categories`}
              </CustomText>
            </View>
          </View>
        </Modal>
      </Portal>
      <Portal>
        <Modal
          visible={editbalance}
          onDismiss={() => seteditbalance(false)}
          contentContainerStyle={styles.editbalance}>
          <HeadingCross
            label={'Update Balance'}
            onCross={() => seteditbalance(false)}
            customrow={styles.crossmodal}
          />
          <LabelInput
            label={'Account Balance'}
            value={accountbalance}
            onChangeText={setaccountbalance}
            keyboardType={'number-pad'}
            customView={styles.balanceinput}
          />
          {error ? (
            <CustomText textStyle={styles.error}>{error}</CustomText>
          ) : null}
          <CustomGradient
            title={'Update'}
            onPress={handleUpdateBalance}
            customView={{...margin(20, 0, 10, 0)}}
          />
        </Modal>
      </Portal>
    </View>
  );
};

export default Dashboard;
