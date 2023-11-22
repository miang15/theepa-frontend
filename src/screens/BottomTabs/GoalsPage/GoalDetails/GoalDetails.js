import {
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {styles} from './styles';
import {
  BackButton,
  CustomGradient,
  CustomSocialBtn,
  LabelInput,
} from '../../../../components';
import {useRoute} from '@react-navigation/native';
import theme from '../../../../utils/theme';
import Images from '../../../../constants/Images';
import {margin} from '../../../../utils/Layout';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  deleteGoalsAction,
  updateGoalsAction,
} from '../../../../redux/Goals/GoalsAction';
import CustomText from '../../../../components/CustomText/CustomText';
import {setAppLoading} from '../../../../redux/AppLoader/appLoaderAction';
import analytics from '@react-native-firebase/analytics';

const GoalDetails = () => {
  const route = useRoute();
  const details = route?.params?.details;
  const [editable, seteditable] = useState(false);
  const [amount, setamount] = useState(details?.targetAmount.toString() || '');
  const [saveamount, setsaveamount] = useState(
    details?.currentAmount.toString() || '',
  );
  const [name, setname] = useState(details?.name || '');

  const [startdate, setstartdate] = useState(
    moment(details?.startDate).format('YYYY-MM-DD') || '',
  );
  const [startdatemodal, setstartdatemodal] = useState(false);
  const [enddate, setenddate] = useState(
    moment(details?.endDate).format('YYYY-MM-DD') || '',
  );
  const [enddatemodal, setenddatemodal] = useState(false);
  const [error, seterror] = useState({type: '', msg: ''});
  const dispatch = useDispatch();
  const inputref = useRef();

  const handleEditname = async () => {
    seteditable(true);
    setTimeout(() => {
      inputref.current.focus();
    }, 100);
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

  const handleUpdateGoal = async () => {
    try {
      seterror({type: '', msg: ''});
      if (!name.toString().trim()) {
        seterror({type: 'name', msg: 'Goal Name is Required'});
      } else if (!amount.toString().trim()) {
        seterror({type: 'amount', msg: 'Amount is Required'});
      } else if (!saveamount.toString().trim()) {
        seterror({type: 'saveamount', msg: 'Saved Amount is Required'});
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
          name: name,
          targetAmount: amount,
          currentAmount: saveamount,
          startDate: startdate,
          endDate: enddate,
        };

        await dispatch(updateGoalsAction(data, details?._id));
        dispatch(setAppLoading(false));
        await analytics().logEvent('update_goal', {
          description: `Goal updated`,
        });
      }
    } catch (error) {
      console.log('update goal: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{...margin(15, 0, 0, 0)}}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.innerrow}>
          {editable ? (
            <TextInput
              ref={inputref}
              editable={editable}
              value={name || details?.name}
              onChangeText={setname}
              onBlur={() => seteditable(false)}
              style={styles.input}
            />
          ) : (
            <CustomText numberOfLines={2} textStyle={styles.input2}>
              {name || details?.name}
            </CustomText>
          )}

          {details?.status == 'active' || details?.status == 'unachieved' ? (
            <TouchableOpacity
              onPress={handleEditname}
              activeOpacity={theme.opacity}>
              <Image source={Images.edit} resizeMode="cover" />
            </TouchableOpacity>
          ) : null}
        </View>
        <LabelInput
          label={'Total Amount'}
          placeholder={'Total amount of goal'}
          value={amount}
          onChangeText={val => {
            const numericValue = val.replace(/[^0-9]/g, '');
            setamount(numericValue);
          }}
          keyboardType={'numeric'}
          disabled={true}
          editable={
            details?.status == 'active' || details?.status == 'unachieved'
          }
        />
        {error?.type == 'amount' ? (
          <CustomText textStyle={styles.error2}>{error?.msg}</CustomText>
        ) : null}
        <LabelInput
          label={'Saved Amount'}
          placeholder={'Saved amount of goal'}
          value={saveamount}
          onChangeText={val => {
            const numericValue = val.replace(/[^0-9]/g, '');
            setsaveamount(numericValue);
          }}
          keyboardType={'numeric'}
          disabled={true}
          editable={
            details?.status == 'active' || details?.status == 'unachieved'
          }
        />
        {error?.type == 'saveamount' ? (
          <CustomText textStyle={styles.error2}>{error?.msg}</CustomText>
        ) : null}
        <LabelInput
          label={'Goal Start Date'}
          placeholder={'Select Date'}
          value={startdate}
          onPress={() => setstartdatemodal(true)}
          keyboardType={'numeric'}
          disabled={
            details?.status !== 'active' && details?.status !== 'unachieved'
          }
          editable={false}
          Icon={Images.calendar}
        />
        {error?.type == 'startdate' ? (
          <CustomText textStyle={styles.error2}>{error?.msg}</CustomText>
        ) : null}
        <LabelInput
          label={'Goal End Date'}
          placeholder={'Select Date'}
          value={enddate}
          onPress={() => setenddatemodal(true)}
          keyboardType={'numeric'}
          disabled={
            details?.status !== 'active' && details?.status !== 'unachieved'
          }
          editable={false}
          Icon={Images.calendar}
        />
        {error?.type == 'enddate' ? (
          <CustomText textStyle={styles.error2}>{error?.msg}</CustomText>
        ) : null}
        {details?.status == 'active' || details?.status == 'unachieved' ? (
          <View style={styles.buttons}>
            <CustomSocialBtn
              onPress={async () => {
                dispatch(deleteGoalsAction(details?._id));
                await analytics().logEvent('delete_goal', {
                  description: `Goal deleted`,
                });
              }}
              title={'Delete'}
              customView={{width: '90%'}}
            />
            <CustomGradient onPress={handleUpdateGoal} title={'Save Changes'} />
          </View>
        ) : null}
      </ScrollView>
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
  );
};

export default GoalDetails;
