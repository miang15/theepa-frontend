import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import CustomText from '../../../../components/CustomText/CustomText';
import CustomInput from '../../../../components/CustomInput/CustomInput';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {styles} from './styles';
import theme from '../../../../utils/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import {useRoute} from '@react-navigation/native';
import {updateGoalsAction} from '../../../../redux/Goals/GoalsAction';
import analytics from '@react-native-firebase/analytics';

const EditGoal = ({navigation}) => {
  const route = useRoute();
  const detail = route?.params?.item;
  const [amount, setamount] = useState(detail?.targetAmount.toString() || '');
  const [name, setname] = useState(detail?.name || '');

  const [startdate, setstartdate] = useState(
    moment(detail?.startDate).format('YYYY-MM-DD') || '',
  );
  const [startdatemodal, setstartdatemodal] = useState(false);
  const [enddate, setenddate] = useState(
    moment(detail?.endDate).format('YYYY-MM-DD') || '',
  );
  const [enddatemodal, setenddatemodal] = useState(false);
  const dispatch = useDispatch();
  const [error, seterror] = useState({type: '', msg: ''});

  useEffect(() => {
    const handleLogs = async () => {
      await analytics().logEvent('screens', {
        description: 'edit goal screen',
      });
    };

    handleLogs();
  }, []);

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
      if (!name) {
        seterror({type: 'name', msg: 'Budget Name is Required'});
      } else if (!amount) {
        seterror({type: 'amount', msg: 'Amount is Required'});
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
        const data = {
          name: name,
          targetAmount: amount,
          startDate: startdate,
          endDate: enddate,
        };

        dispatch(updateGoalsAction(data, detail?._id));
        await analytics().logEvent('functionality', {
          description: `update goal`,
        });
      }
    } catch (error) {}
  };

  return (
    <View style={styles.slide3}>
      <View style={styles.row1}>
        <View style={styles.empty} />
        <CustomText numberOfLines={1} textStyle={styles.screen}>
          {`Edit Goal`}
        </CustomText>
        <Entypo
          onPress={() => navigation.goBack()}
          name="cross"
          size={24}
          color={theme.black}
        />
      </View>
      <CustomInput
        label={'Name'}
        value={name}
        onChangeText={setname}
        customStyle={styles.goal}
      />
      {error?.type == 'name' ? (
        <CustomText textStyle={styles.error2}>{error?.msg}</CustomText>
      ) : null}
      <CustomInput
        label={'Amount'}
        value={amount}
        onChangeText={val => {
          const numericValue = val.replace(/[^0-9]/g, '');
          setamount(numericValue);
        }}
        keyboardType={'numeric'}
        customStyle={styles.goalamount}
      />
      {error?.type == 'amount' ? (
        <CustomText textStyle={styles.error2}>{error?.msg}</CustomText>
      ) : null}

      <View style={styles.daterow}>
        <CustomButton
          onPress={() => setstartdatemodal(true)}
          title={startdate || 'Start Date'}
          customLabelStyle={{color: theme.black}}
          customStyle={styles.startdate}
        />
        <CustomButton
          onPress={() => setenddatemodal(true)}
          title={enddate || 'End Date'}
          customLabelStyle={{color: theme.black}}
          customStyle={styles.startdate}
        />
      </View>
      {error?.type == 'startdate' ? (
        <CustomText textStyle={styles.error2}>{error?.msg}</CustomText>
      ) : null}
      {error?.type == 'enddate' ? (
        <CustomText textStyle={styles.error2}>{error?.msg}</CustomText>
      ) : null}
      <CustomButton
        onPress={handleUpdateGoal}
        customLabelStyle={{color: theme.black}}
        title={`Update Goal`}
        customStyle={styles.setcategory}
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
  );
};

export default EditGoal;
