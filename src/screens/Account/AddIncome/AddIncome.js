import {ScrollView, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import theme from '../../../utils/theme';
import {
  BackButton,
  CustomGradient,
  CustomPicker,
  HeadingCross,
  LabelInput,
} from '../../../components';
import CustomText from '../../../components/CustomText/CustomText';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import CustomButton from '../../../components/CustomButton/CustomButton';
import {Checkbox} from 'react-native-paper';
import http from '../../../config/http';
import {TRANSACTION} from '../../../config/endpoint';
import {
  setAppLoading,
  setAppToast,
} from '../../../redux/AppLoader/appLoaderAction';
import {
  getAccountAction,
  getDashboardAction,
  getWidgetsAction,
  updateAccount,
} from '../../../redux/Dashboard/DashboardAction';
import {getProfileAction} from '../../../redux/Auth/authAction';
import {getGoalsAction} from '../../../redux/Goals/GoalsAction';
import Images from '../../../constants/Images';
import {margin} from '../../../utils/Layout';
import analytics from '@react-native-firebase/analytics';

const AddIncome = ({navigation}) => {
  const accounts = useSelector(state => state.DashboardReducer.accounts);
  const goals = useSelector(state => state.DashboardReducer.goals);
  const user = useSelector(state => state.auth.user);
  const dashboardData = useSelector(state => state.DashboardReducer.dashboard);
  const [myaccounts, setmyaccounts] = useState([]);
  const [mygoals, setmygoals] = useState([]);
  const [selectedaccount, setselectedaccount] = useState('');
  const [selectedgoal, setselectedgoal] = useState('');
  const [error, seterror] = useState({type: '', msg: ''});
  const [startdatemodal, setstartdatemodal] = useState(false);
  const [amount, setamount] = useState('');
  const [notes, setnotes] = useState('');
  const [date, setdate] = useState('');
  const [checked, setChecked] = useState(false);
  const [isManualAccount, setisManualAccount] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (accounts?.UserAccounts?.length) {
      let arr = [];
      accounts?.UserAccounts?.forEach(item => {
        if (item?.isManual) {
          arr.push({
            label: item?.accountName,
            value: item?._id,
          });
        }
      });
      setmyaccounts(arr);
    }
  }, [accounts]);

  useEffect(() => {
    if (selectedaccount) {
      accounts?.UserAccounts?.find(item => {
        if (selectedaccount == item?._id) {
          setisManualAccount(item?.isManual);
        }
      });
    }
  }, [selectedaccount]);

  useEffect(() => {
    if (goals?.length) {
      let arr = [];
      goals?.forEach(item => {
        if (item?.status == 'active') {
          arr.push({
            label: item?.name,
            value: item?._id,
          });
        }
      });
      setmygoals(arr);
    }
  }, [goals]);

  const handleAdd = async () => {
    try {
      seterror({type: '', msg: ''});

      if (!amount.toString().trim())
        return seterror({type: 'amount', msg: 'Amount is Required'});

      if (!selectedaccount && !selectedgoal) {
        return seterror({
          type: 'account',
          msg: 'Account or Goal is Required',
        });
      }

      if (!date) return seterror({type: 'date', msg: 'Date is Required'});

      dispatch(setAppLoading(true));
      const datenow = Date.now();
      const category = dashboardData?.userData?.categories?.find(
        cat => cat?.name.toLowerCase() == 'income',
      );

      const data = {
        type: 'income',
        time: date,
        createdAt: datenow.toString(),
        amount: Number(amount),
        accountID: selectedaccount || undefined,
        note: notes || undefined,
        goals: selectedgoal || undefined,
        exclude_from_income: selectedgoal ? true : false,
        category: selectedgoal ? undefined : category?._id,
      };

      const addRes = await http.post(TRANSACTION.addincome, data);
      if (addRes?.data?.success) {
        const goal = addRes?.data?.data?.budget?.history?.goals;
        if (selectedaccount) {
          const data = accounts?.UserAccounts?.find(item => {
            if (item?._id == selectedaccount) {
              item.amount = Number(item?.amount) + Number(amount);
              return item;
            }
          });
          dispatch(updateAccount(data));
        }
        await Promise.all([
          dispatch(getDashboardAction()),
          dispatch(getProfileAction()),
          dispatch(getWidgetsAction()),
          dispatch(getGoalsAction()),
        ]);
        dispatch(setAppLoading(false));

        if (!user?.BudgetndGoalsNotification) {
          setTimeout(() => {
            if (goal?.status == 'completed') {
              dispatch(
                setAppToast({
                  title: 'Success!!!',
                  description: `Your ${goal?.name} goal is completed`,
                  status: 'success',
                  showToast: true,
                }),
              );
            } else if (goal?.status == 'unachieved') {
              dispatch(
                setAppToast({
                  title: 'Alert',
                  description: `Your ${goal?.name} goal is Unachieved`,
                  status: 'danger',
                  showToast: true,
                }),
              );
            } else {
              dispatch(
                setAppToast({
                  title: 'Success!!!',
                  description: addRes?.data?.data?.message,
                  status: 'success',
                  showToast: true,
                }),
              );
            }
          }, 1000);
        }

        setTimeout(() => {
          navigation.goBack();
        }, 2000);

        await analytics().logEvent('manual_add_income', {
          description: `Income added manually`,
        });
      }
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <CustomText numberOfLines={1} textStyle={styles.heading}>
        Add Income Details
      </CustomText>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <LabelInput
          disabled={true}
          label={'Amount'}
          placeholder={'Add amount in PKR'}
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

        {selectedaccount ? null : (
          <CustomPicker
            label={'Goal'}
            disabled={!mygoals?.length}
            data={mygoals}
            setdata={setmygoals}
            pickervalue={selectedgoal}
            selectItem={val => {
              if (val.value == selectedgoal) {
                setselectedgoal('');
              } else {
                setselectedgoal(val?.value);
                setselectedaccount('');
              }
            }}
            placeholder={mygoals?.length ? 'Select a goal' : `No Goals Found`}
            title={'Select Goals'}
            customContainer={styles.goals}
          />
        )}
        {error?.type == 'goal' ? (
          <CustomText textStyle={styles.error}>{error?.msg}</CustomText>
        ) : null}
        {selectedgoal ? null : (
          <CustomPicker
            disabled={!myaccounts?.length}
            label={'Account'}
            data={myaccounts}
            setdata={setmyaccounts}
            pickervalue={selectedaccount}
            selectItem={val => {
              if (val?.value == selectedaccount) {
                setselectedaccount('');
              } else {
                setselectedaccount(val?.value);
                setselectedgoal('');
              }
            }}
            placeholder={
              myaccounts?.length
                ? 'Select an account'
                : 'No Manual Account Found'
            }
            title={'Select Account'}
            // customContainer={styles.account}
          />
        )}
        {error?.type == 'account' ? (
          <CustomText textStyle={styles.error}>{error?.msg}</CustomText>
        ) : null}

        <LabelInput
          label={'Date'}
          placeholder={'Select Date'}
          value={date}
          disabled={false}
          editable={false}
          Icon={Images.calendar}
          onPress={() => setstartdatemodal(true)}
        />

        {error?.type == 'date' ? (
          <CustomText textStyle={styles.error}>{error?.msg}</CustomText>
        ) : null}
        <CustomText textStyle={styles.noteslabel}>Additional Notes</CustomText>
        <TextInput
          placeholder="Add your notes"
          numberOfLines={5}
          value={notes}
          onChangeText={setnotes}
          textAlignVertical="top"
          multiline={true}
          style={styles.notes}
        />

        {/* {isManualAccount ? (
          <View style={styles.row}>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
              uncheckedColor={theme.darkestgray}
              color={theme.skyblue}
            />
            <CustomText  textStyle={styles.desc}>
              {`Do not include this amount in ${'\n'}my total income`}
            </CustomText>
          </View>
        ) : null} */}
        <CustomGradient
          customView={styles.add}
          onPress={handleAdd}
          title={'Add Details'}
        />
      </ScrollView>
      <DateTimePickerModal
        maximumDate={new Date()}
        isVisible={startdatemodal}
        mode="date"
        onConfirm={date => {
          const formatdate = moment(date).format('YYYY-MM-DD');
          setdate(formatdate);
          setstartdatemodal(false);
        }}
        onCancel={() => setstartdatemodal(false)}
      />
    </View>
  );
};

export default AddIncome;
