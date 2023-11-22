import {ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import CustomText from '../../../../components/CustomText/CustomText';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {styles} from './styles';
import moment from 'moment';
import {addGoalsAction} from '../../../../redux/Goals/GoalsAction';
import {
  BackButton,
  CustomGradient,
  HeadingCross,
  LabelInput,
} from '../../../../components';
import Images from '../../../../constants/Images';
import {setAppLoading} from '../../../../redux/AppLoader/appLoaderAction';
import analytics from '@react-native-firebase/analytics';

const AddNewGoal = ({navigation}) => {
  const [amount, setamount] = useState('');
  const [name, setname] = useState('');
  const [startdate, setstartdate] = useState();
  const [startdatemodal, setstartdatemodal] = useState(false);
  const [enddate, setenddate] = useState();
  const [enddatemodal, setenddatemodal] = useState(false);
  const dispatch = useDispatch();
  const [error, seterror] = useState({type: '', msg: ''});

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

  const handleAddGoal = async () => {
    try {
      seterror({type: '', msg: ''});
      if (!name.toString().trim()) {
        seterror({type: 'name', msg: 'Budget Name is Required'});
      } else if (!amount.toString().trim()) {
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
        dispatch(setAppLoading(true));
        const data = {
          name: name,
          targetAmount: amount,
          startDate: startdate,
          endDate: enddate,
        };

        await dispatch(addGoalsAction(data));
        dispatch(setAppLoading(false));
        await analytics().logEvent('add_goal', {
          description: `New goal added`,
        });
      }
    } catch (error) {}
  };

  return (
    <View style={styles.slide3}>
      <BackButton />
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeadingCross label={'Add New Goal'} hideCross={true} />
        <LabelInput
          label={'Goal Name'}
          placeholder={'Enter goal name'}
          value={name}
          onChangeText={setname}
          disabled={true}
          customView={styles.goal}
        />

        {error?.type == 'name' ? (
          <CustomText textStyle={styles.error2}>{error?.msg}</CustomText>
        ) : null}
        <LabelInput
          label={'Amount'}
          placeholder={'Enter goal amount'}
          value={amount}
          onChangeText={val => {
            const numericValue = val.replace(/[^0-9]/g, '');
            setamount(numericValue);
          }}
          keyboardType={'numeric'}
          disabled={true}
        />

        {error?.type == 'amount' ? (
          <CustomText textStyle={styles.error2}>{error?.msg}</CustomText>
        ) : null}
        <LabelInput
          label={'Goal Start Date'}
          placeholder={'Select Date'}
          value={startdate}
          editable={false}
          onPress={() => setstartdatemodal(true)}
          Icon={Images.calendar}
        />
        {error?.type == 'startdate' ? (
          <CustomText textStyle={styles.error2}>{error?.msg}</CustomText>
        ) : null}
        <LabelInput
          label={'Goal End Date'}
          placeholder={'Select Date'}
          value={enddate}
          editable={false}
          onPress={() => setenddatemodal(true)}
          Icon={Images.calendar}
        />
        {error?.type == 'enddate' ? (
          <CustomText textStyle={styles.error2}>{error?.msg}</CustomText>
        ) : null}
        <CustomGradient
          title={'Add Goal'}
          onPress={handleAddGoal}
          customView={styles.add}
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
      </ScrollView>
    </View>
  );
};

export default AddNewGoal;
